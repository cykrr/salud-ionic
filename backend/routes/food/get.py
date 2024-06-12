from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import app, query
from responses import *
from constants import FOOD_UNITS

@app.route('/food/get', methods=['GET'])
@jwt_required()
def get_food():
    id = request.args.get('id')

    if not id:
        return not_found_error('id')
    
    try: 
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    jwt_id = get_jwt_identity()
    if id != jwt_id:
        return unauthorized_error()
    
    try:
        data = query(f"SELECT idAlimento, nombre, calorias, unidad FROM alimentos WHERE (idUsuario={id} OR idUsuario IS NULL) AND habilitado = 1")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for food in data:
        try: 
            response.append({
                "id": food['idAlimento'],
                "nombre": food['nombre'],
                "calorias": food['calorias'],
                "unidad": FOOD_UNITS[food['unidad']],
                "unidadId": food['unidad']
            })
        except:
            print("Error en el for")

    return jsonify(response)