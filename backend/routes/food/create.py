from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required, get_jwt
from app import app, query
from responses import *

@app.route('/food', methods=['POST'])
@jwt_required()
def create_food():
    idUsuario = request.form.get('idUsuario')
    nombre = request.form.get('nombre')
    calorias = request.form.get('calorias')
    unidad = request.form.get('unidad')
    porcion = request.form.get('porcion')

    if not idUsuario:
        return not_found_error('idUsuario')
    if not nombre:
        return not_found_error('nombre')
    if not calorias:
        return not_found_error('calorias')
    if not unidad:
        return not_found_error('unidad')
    if not porcion:
        return not_found_error('porcion')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('idUsuario')
    
    try:
        calorias = int(calorias)
    except ValueError:
        return not_int_error('calorias')
    
    try:
        unidad = int(unidad)
    except ValueError:
        return not_int_error('unidad')
    
    try:
        porcion = int(porcion)
    except ValueError:
        return not_int_error('porcion')
    
    jwt_id = get_jwt_identity()
    if idUsuario != jwt_id:
        return unauthorized_error()
    
    calorias = int(calorias * 100 / porcion)

    try:
        user_data = get_jwt()
        if user_data["rol"] == "administrador":
            query(f"INSERT INTO alimentos (idUsuario, nombre, calorias, unidad) VALUES (NULL, '{nombre}', {calorias}, {unidad})")
        else:
            query(f"INSERT INTO alimentos (idUsuario, nombre, calorias, unidad) VALUES ({idUsuario}, '{nombre}', {calorias}, {unidad})")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento registrado con éxito")