from flask import jsonify
from flask_jwt_extended import jwt_required
from app import app, query
from responses import *

@app.route('/exercise', methods=['GET'])
@jwt_required()
def user_exercise():
    try:
        data = query(f"SELECT idEjercicio, nombre, calorias FROM ejercicios WHERE habilitado = 1")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for exercise in data:
        response.append({
            "id": exercise['idEjercicio'],
            "nombre": exercise['nombre'],
            "calorias": exercise['calorias']
        })

    return jsonify(response)