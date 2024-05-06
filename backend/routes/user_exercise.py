from flask import Blueprint, request, jsonify
from app import query
from responses import *
from flask_cors import cross_origin

bp = Blueprint('user_exercise', __name__)

@bp.route('/user/exercise', methods=['GET'])
def get_exercise():
    id = request.args.get('id')
    
    if not id:
        return not_found_error('id')
    
    try:
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
        data = query(f"SELECT nombre, calorias, minutos FROM ejerciciosUsuario JOIN ejercicios using(idEjercicio) WHERE ejerciciosUsuario.idUsuario={id} AND DATE(fecha) = CURDATE()")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for food in data:
        response.append({
            "nombre": food['nombre'],
            "calorias": int(food['calorias'] * food['minutos'] / 60),
            "minutos": food['minutos']
        })

    return jsonify(response)