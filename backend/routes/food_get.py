from flask import Blueprint, request, jsonify
from app import query
from responses import *
from constants import FOOD_UNITS


bp = Blueprint('food_get', __name__)

@bp.route('/food/get', methods=['GET'])
def get_food():
    id = request.args.get('id')

    if not id:
        return not_found_error('id')
    
    try: 
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
        data = query(f"SELECT idAlimento, nombre, unidad FROM alimentos WHERE idUsuario={id} OR idUsuario IS NULL")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for food in data:
        try: 
            response.append({
                "id": food['idAlimento'],
                "nombre": food['nombre'],
                "unidad": FOOD_UNITS[food['unidad']]
            })
        except:
            print("Error en el for")

    return jsonify(response)