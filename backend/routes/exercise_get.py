from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app import query
from responses import *

bp = Blueprint('exercise_get', __name__)


@bp.route('/exercise/get', methods=['GET'])
@jwt_required()
def user_exercise():
    try:
        data = query(f"SELECT idEjercicio, nombre FROM ejercicios")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for exercise in data:
        response.append({
            "id": exercise['idEjercicio'],
            "nombre": exercise['nombre'],
        })

    return jsonify(response)