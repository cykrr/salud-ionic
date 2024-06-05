from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from app import query
from responses import *

bp = Blueprint('exercise_delete', __name__)


@bp.route('/exercise/delete', methods=['DELETE'])
@jwt_required()
def delete_exercise():
    id_ejercicio = request.form.get('idEjercicio')

    if not id_ejercicio:
        return not_found_error('idEjercicio')
    
    try:
        id_ejercicio = int(id_ejercicio)
    except ValueError:
        return not_int_error('idEjercicio')
    
    user_data = get_jwt()
    if user_data["rol"] != "administrador":
        return unauthorized_error()
    
    try:
        query(f"UPDATE ejercicios SET habilitado = 0 WHERE idEjercicio = {id_ejercicio}")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Ejercicio eliminado con éxito")