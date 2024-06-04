
from flask import Blueprint, request, jsonify
from app import query, get_region_data, get_db
from responses import *
from constants import HASH_LENGTH

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
        return not_found_error("Usuario es requerido")
    if not rut:
        return not_found_error("rut es requerido")
    if not edad:
        return not_found_error("edad es requerida")
    if not genero:
        return not_found_error("género es requerido")
    if not correo:
        return not_found_error("correo es requerido")
    if not password:
        return not_found_error("contraseña es requerida")
    if not confirm_password:
        return not_found_error("confirmar contraseña es requerido")
    if not region:
        return not_found_error("región es requerida")
    if not comuna:
        return not_found_error("comuna es requerida")

    if not validate_email(correo):
        return error('Correo inválido')
    if not validate_password(password, confirm_password):
        return error('Contraseña inválida')
    if not validate_name(user):
        return error('Nombre inválido')
    if not validate_age(edad):
        return error('Edad inválida')
    if not validate_rut(rut):
        return error('RUT inválido')
    if not validate_region(region):
        return error('Región inválida')
    if not validate_comuna(region, comuna):
        return error('Comuna inválida')
    if user_exists(user):
        return error('Usuario ya existe')
    if email_exists(correo):
        return error('Correo ya existe')
    
    rut = rut.replace('.', '')

    try:
        ret = query(f"INSERT INTO usuarios (nombre, rut, region, comuna, sexo, edad, correo, clave) VALUES \
                                      ('{user}', '{rut}', '{region}', '{comuna}', '{genero}', '{edad}', '{correo}', SHA2('{password}', {HASH_LENGTH}))")
        ret = query(f"SELECT idUsuario, nombre FROM usuarios WHERE correo='{correo}'")    
    except Exception as e:
        print(e)
        return bd_error()
    
    return jsonify({"success": True,
                    "message": "Registrado correctamente",
                    "user": {
                        "idUsuario": ret[0]['idUsuario'],
                        "nombre": ret[0]['nombre']
                    }}), 200


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

def validate_genre(genre: str):
    try:
        genre = int(genre)
    except ValueError:
        return False
    return genre in [1, 2, 3]

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
    try:
        r = int(region)-1
        c = int(comuna)-1
    except:
        return False
    regiones: list[dict] = get_region_data()['regiones']
    region = regiones[r]
    comunas_region = sorted(region['comunas'])
    len_comunas = len(comunas_region)
    # print(f"len_comunas[{region['comunas'][c]}]", len_comunas)
    if c < 0 or c >= len_comunas:
        return False
    return True

def user_exists(user: str):
    result = query(f"SELECT * FROM usuarios WHERE nombre = '{user}'")
    return len(result) > 0

def email_exists(email: str):
    result = query(f"SELECT * FROM usuarios WHERE correo = '{email}'")
    return len(result) > 0