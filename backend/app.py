from flask import Flask, request, g, current_app
from responses import *
from util import *
from db import *

app = Flask(__name__)
db = None

def get_db():
    global db
    if not db:
        db = create_connection()
        create_db(db)

    return db


# Registrar alimento
@app.route('/food/add', methods=['POST'])
def add_food():
    idAlimento = request.form.get('idAlimento')
    idUsuario = request.form.get('idUsuario')
    cantidad = request.form.get('cantidad')
    fecha = request.form.get('fecha')

    if not idAlimento:
        return not_found_error('idAlimento')
    if not idUsuario:
        return not_found_error('idUsuario')
    if not cantidad:
        return not_found_error('cantidad')
    if not fecha:
        return not_found_error('fecha')
    
    try:
        idAlimento = int(idAlimento)
    except ValueError:
        return not_int_error('idAlimento')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('idUsuario')
    
    try:
        cantidad = int(cantidad)
    except ValueError:
        return not_int_error('cantidad')
    
    if not validate_date(fecha):
        return date_format_error('fecha')
    
    try:
        query(get_db(), f"INSERT INTO alimentosUsuario (idAlimento, idUsuario, cantidad, fecha) VALUES ({idAlimento}, {idUsuario}, {cantidad}, {fecha})")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento registrado con éxito")



# Ejemplo CREAR NUEVO ALIMENTO
@app.route('/products', methods=['POST'])
def get_product():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("USE app_saludable")
    cursor.execute("INSERT INTO alimentos (nombre, calorias) VALUES ('Abdominales', 50)")
    db.commit()

get_db()