from flask import Blueprint, request, jsonify
from app import query
from responses import *
from constants import FOOD_UNITS

bp = Blueprint('user_food', __name__)

@bp.route('/user/food/', methods=['GET'])
def get_food():
    id = request.args.get('id')
    if not id:
        return not_found_error('id')
    try: 
        id = int(id)
    except ValueError:
        return not_int_error('id')
    try:
        data = query(f"SELECT nombre, calorias, cantidad, unidad FROM alimentos WHERE idUsuario={id} OR idUsuario IS NULL")
        print(data)
    except Exception as e:
        print(e)
        return bd_error()
    response = []
    for food in data:
        response.append({
            "nombre": food['nombre'],
            "calorias": food['calorias'],
            "cantidad": food['cantidad'],
            "unidad": FOOD_UNITS[food['unidad']]
        })
    print(response)
    return jsonify(response)


@bp.route('/user/food/consumption', methods=['GET'])
def add_food():
    id = request.args.get('id')
    print(id)
    
    if not id:
        return not_found_error('id')
    
    try:
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for food in data:
        response.append({
            "nombre": food['nombre'],
            "calorias": food['calorias'] * food['cantidad'] / 100,
            "unidad": FOOD_UNITS[food['unidad']]
        })

    return jsonify(response)