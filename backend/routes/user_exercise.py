from flask import Blueprint, request, jsonify
from app import query
from responses import *
from routes.user_health import get_recommended_minutes


bp = Blueprint('user_exercise', __name__)

@bp.route('/user/exercise', methods=['GET'])
def get_user_exercise():
    id = request.args.get('id')
    
    if not id:
        return not_found_error('id')
    
    try:
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
        data = query(f"SELECT nombre, calorias, minutos FROM ejerciciosUsuario JOIN ejercicios using(idEjercicio) WHERE ejerciciosUsuario.idUsuario={id} AND DATE(fecha) = CURDATE()")
        recommended = get_recommended_minutes()
    except Exception as e:
        print(e)
        return bd_error()
    
    exercise_list = []
    totalCalorias = 0
    totalMinutos = 0
    for food in data:
        item = {
            "nombre": food['nombre'],
            "calorias": int(food['calorias'] * food['minutos'] / 60),
            "minutos": food['minutos']
        }
        exercise_list.append(item)
        totalMinutos = totalMinutos + item['minutos']
        totalCalorias = totalCalorias + item['calorias']

    return jsonify({
        "ejercicios": exercise_list,
        "totalMinutos": totalMinutos,
        "totalCalorias": totalCalorias,
        "minutosRecomendados": recommended
    })