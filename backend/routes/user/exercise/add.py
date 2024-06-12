from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import app, query
from responses import *

@app.route('/exercise/add', methods=['POST'])
@jwt_required()
def add_exercise():
    idEjercicio = request.form.get('idEjercicio')
    idUsuario = request.form.get('idUsuario')
    minutos = request.form.get('minutos')

    if not idEjercicio:
        return not_found_error('idEjercicio')
    if not idUsuario:
        return not_found_error('idUsuario')
    if not minutos:
        return not_found_error('minutos')
    
    try:
        idEjercicio = int(idEjercicio)
    except ValueError:
        return not_int_error('idEjercicio')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('idUsuario')
    
    try:
        minutos = int(minutos)
    except ValueError:
        return not_int_error('minutos')
    
    jwt_id = get_jwt_identity()
    if idUsuario != jwt_id:
        return unauthorized_error()
    
    try:
        query(f"INSERT INTO ejerciciosUsuario (idEjercicio, idUsuario, minutos, fecha) VALUES ({idEjercicio}, {idUsuario}, {minutos}, CURDATE())")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Ejercicio registrado con éxito")