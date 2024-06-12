from flask import request
from flask_jwt_extended import jwt_required, get_jwt
from app import app, query
from responses import *

@app.route('/exercise/create', methods=['POST'])
@jwt_required()
def create_exercise():
    nombre = request.form.get('nombre')
    calorias = request.form.get('calorias')

    if not nombre:
        return not_found_error('nombre')
    if not calorias:
        return not_found_error('calorias')
    
    try:
        calorias = int(calorias)
    except ValueError:
        return not_int_error('calorias')
    
    user_data = get_jwt()
    if user_data["rol"] != "administrador":
        return unauthorized_error()

    try:
        query(f"INSERT INTO ejercicios (nombre, calorias) VALUES ('{nombre}', {calorias})")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Ejercicio registrado con éxito")