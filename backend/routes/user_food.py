from flask import Blueprint, request, jsonify
from app import query
from responses import *
from constants import FOOD_UNITS

bp = Blueprint('user_food', __name__)

@bp.route('/user/food/', methods=['POST'])
def get_food(methods=["GET"])
    id = request.args.get('id')
    if not id:
        return not_found_error('id')
    try: 
        id = int(id)
    except ValueError:
        return not_int_error('id')
    try:
        data = query(f"SELECT nombre, calorias, cantidad, unidad FROM alimentos WHERE idUsuario={id} OR idUsuario IS NULL")
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
    return jsonify(response)


@bp.route('/user/food/consumption', methods=['GET'])
def add_food():
    id = request.args.get('id')
    if not id:
        return not_found_error('id')
    
    try:
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
        data = query(f"SELECT nombre, calorias, cantidad, unidad FROM alimentosUsuario JOIN alimentos using(idAlimento) WHERE alimentosUsuario.idUsuario={id} AND DATE(fecha) = CURDATE()")
    except Exception as e:
        print(e)
        return bd_error()
    
    response = []
    for food in data:
        response.append({
            "nombre": food['nombre'],
            "calorias": food['calorias'] * food['cantidad'] / 100,
            "cantidad": food['cantidad'],
            "unidad": FOOD_UNITS[food['unidad']]
        })

    return jsonify(response)