
from flask import Blueprint, request, jsonify
from app import query, get_region_data, get_db

PASSWORD_LENGTH = 5

bp = Blueprint('register', __name__)


@bp.route('/register', methods=['POST'])
def register():
    user = request.form.get('user')
    rut = request.form.get('rut')
    edad = request.form.get('edad')
    genero = request.form.get('genero')
    correo = request.form.get('correo')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    region = request.form.get('region')
    comuna = request.form.get('comuna')
    if not user:
        return jsonify({'error': 'usuario es requerido'}), 400
    if not rut:
        return jsonify({'error': 'rut es requerido'}), 400
    if not edad:
        return jsonify({'error': 'edad es requerida'}), 400
    if not genero:
        return jsonify({'error': 'género es requerido'}), 400
    if not correo:
        return jsonify({'error': 'correo es requerido'}), 400
    if not password:
        return jsonify({'error': 'contraseña es requerida'}), 400
    if not confirm_password:
        return jsonify({'error': 'confirmar contraseña es requerido'}), 400
    if not region:
        return jsonify({'error': 'región es requerida'}), 400
    if not comuna:
        return jsonify({'error': 'comuna es requerida'}), 400
    if not validate_email(correo):
        return jsonify({'error': 'Correo inválido'}), 400
    if not validate_password(password, confirm_password):
        return jsonify({'error': 'Contraseña inválida'}), 400
    if not validate_name(user):
        return jsonify({'error': 'Nombre inválido'}), 400
    if not validate_age(edad):
        return jsonify({'error': 'Edad inválida'}), 400
    if not validate_rut(rut):
        return jsonify({'error': 'RUT inválido'}), 400
    if not validate_region(region):
        return jsonify({'error': 'Región inválida'}), 400
    if not validate_comuna(region, comuna):
        return jsonify({'error': 'Comuna inválida'}), 400
    if user_exists(user):
        return jsonify({'error': 'Usuario ya existe'}), 400
    if email_exists(correo):
        return jsonify({'error': 'Correo ya existe'}), 400
    rut = rut.replace('.', '')
    try:
        query(f"INSERT INTO usuarios (nombre, rut, region, comuna, sexo, correo, clave) VALUES \
                                      ('{user}', '{rut}', '{region}', '{comuna}', '{genero}', '{correo}', '{password}')")
    except Exception as e:
        print(e)
        return jsonify({'error': 'Database error'}), 500
    return jsonify({'success': 'Registrado correctamente'}), 200

    print (user, rut, edad, genero, correo, password, confirm_password, region, comuna)



def validate_email(email):
    has_at = '@' in email
    has_dot = '.' in email

    domain_length = len(email.split('.')[-1])
    domain = domain_length >= 2
    user_length = len(email.split('@')[0])

    # Check for RFC 822
    is_rfc822_compliant = has_at and has_dot and domain and user_length >= 1
    return is_rfc822_compliant 

def validate_password(password: str, confirm_password: str):
    large_enough = len(password) >= 5
    return large_enough and password == confirm_password

def validate_name(name: str):
    only_letters = all([char.isalpha() or char.isspace() for char in name])
    return len(name) >= 1 and only_letters

def validate_age(age: str):
    try: 
        age = int(age)
    except ValueError:
        return False
    return age >= 0 and age <= 150

def dgv(rut: str):
    reversed_digits = rut[::-1]
    factors = [2, 3, 4, 5, 6, 7, 2, 3]
    total = 0
    for i, digit in enumerate(reversed_digits):
        total += int(digit) * factors[i % 8]
    return 11 - total % 11

def validate_rut(rut: str):
    digito_verificador = rut.split('-')[-1]
    if digito_verificador == 'K' or digito_verificador == 'k':
        digito_verificador = 10
    else:
        try:
            digito_verificador = int(digito_verificador)
        except ValueError:
            return False
    nrut = str(rut[:])
    nrut = nrut.replace('.', '')
    nrut = nrut.replace('-', '')
    nrut = nrut[:-1]
    calculo = dgv(nrut)
    if digito_verificador == calculo:
        return True
    return False

def validate_region(region: str):
    regiones: list[dict] = get_region_data()['regiones']
    regiones = sorted(regiones, key=lambda x: x['region'])
    region_count = len(regiones)

    pridx = -1
    try: 
        pridx = int(region)
    except:
        return False
    if pridx < 0 or pridx >= region_count:
        return False
    return True
def validate_comuna(region: str, comuna: str):
    r = -1
    c = -1
    print(region, comuna)
    try:
        r = int(region)-1
        c = int(comuna)+1
    except:
        return False
    regiones: list[dict] = get_region_data()['regiones']
    region = regiones[r]
    comunas_region = region['comunas']
    len_comunas = len(comunas_region)
    print(f"len_comunas[{region['comunas'][r]}]", len_comunas)
    if c < 0 or c >= len_comunas:
        return False
    return True


    

def user_exists(user: str):
    # do_query
    db = get_db()
    do_query = db.cursor()
    do_query.execute(f"SELECT * FROM usuarios WHERE nombre = '{user}'")
    ret = do_query.fetchall()
    return len(ret) > 0

def email_exists(email: str):
    db = get_db()
    do_query = db.cursor()
    do_query.execute(f"SELECT * FROM usuarios WHERE correo = '{email}'")
    ret = do_query.fetchall()
    return len(ret) > 0