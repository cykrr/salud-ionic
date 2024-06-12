from flask import request
from flask_jwt_extended import jwt_required, get_jwt
from app import app, query
from responses import *

@app.route('/exercise', methods=['PUT'])
@jwt_required()
def update_exercise():
    id_ejercicio = request.form.get('idEjercicio')
    nombre = request.form.get('nombre')
    calorias = request.form.get('calorias')

    if not id_ejercicio:
        return not_found_error('idEjercicio')
    if not nombre:
        return not_found_error('nombre')
    if not calorias:
        return not_found_error('calorias')
    
    try:
        id_ejercicio = int(id_ejercicio)
    except ValueError:
        return not_int_error('calorias')
    
    try:
        calorias = int(calorias)
    except ValueError:
        return not_int_error('calorias')
    
    user_data = get_jwt()
    if user_data["rol"] != "administrador":
        return unauthorized_error()

    try:
        query(f"UPDATE ejercicios SET nombre = '{nombre}', calorias = {calorias} WHERE idEjercicio = {id_ejercicio}")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Ejercicio actualizado con éxito")