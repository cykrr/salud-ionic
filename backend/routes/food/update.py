from flask import request
from flask_jwt_extended import jwt_required, get_jwt
from app import app, query
from responses import *

@app.route('/food/update', methods=['PUT'])
@jwt_required()
def update_food():
    id_alimento = request.form.get('idAlimento')
    nombre = request.form.get('nombre')
    calorias = request.form.get('calorias')
    unidad = request.form.get('unidad')
    porcion = request.form.get('porcion')
    
    if not id_alimento:
        return not_found_error('idAlimento')
    if not nombre:
        return not_found_error('nombre')
    if not calorias:
        return not_found_error('calorias')
    if not unidad:
        return not_found_error('unidad')
    if not porcion:
        return not_found_error('porcion')
    
    try:
        id_alimento = int(id_alimento)
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
    
    user_data = get_jwt()
    if user_data["rol"] != "administrador":
        return unauthorized_error()
    
    calorias = int(calorias * 100 / porcion)

    try:
        query(f"UPDATE alimentos SET nombre = '{nombre}', calorias = {calorias}, unidad = {unidad} WHERE idAlimento = {id_alimento}")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento actualizado con éxito")