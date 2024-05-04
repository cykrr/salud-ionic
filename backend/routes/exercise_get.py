from flask import Blueprint, request, jsonify
from app import query
from responses import *

bp = Blueprint('exercise_get', __name__)


@bp.route('/exercise/get', methods=['GET'])
def get_exercise():
    
    try:
        data = query(f"SELECT idEjercicio, nombre FROM ejercicios")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for exercise in data:
        response.append({
            "idEjercicio": exercise['idEjercicio'],
            "nombre": exercise['nombre'],
        })

    return jsonify(response)