from flask import Blueprint, request, jsonify
from datetime import date, timedelta
from app import query
from responses import *

bp = Blueprint('health', __name__)

def get_date_array():
    today = date.today()
    days = []

    for i in range(7):
        fecha = today - timedelta(days=i)
        days.append(fecha)

    return days
    
def get_food_data(id):
    data = query(f"SELECT CAST(SUM(cantidad * calorias / 100) as INT) as total, fecha FROM alimentosUsuario JOIN alimentos USING(idAlimento) WHERE alimentosUsuario.idUsuario = {id} AND fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) GROUP BY fecha")

    dates = get_date_array()
    for date in dates:
        found = False
        for i in range(len(data)):
            if date == data[i]['fecha']:
                found = True
                break

        if not found:
            data.append({
                'fecha': date,
                'total': 0
            })

    return data

def get_exercise_data(id):
    data = query(f"SELECT CAST(SUM(minutos * calorias / 60) as INT) as totalCalorias, CAST(SUM(minutos) as INT) as totalMinutos, fecha FROM ejerciciosUsuario JOIN ejercicios USING(idEjercicio) WHERE ejerciciosUsuario.idUsuario = {id} AND fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) GROUP BY fecha")
    
    dates = get_date_array()
    for date in dates:
        found = False
        for i in range(len(data)):
            if date == data[i]['fecha']:
                found = True
                break

        if not found:
            data.append({
                'fecha': date,
                'totalCalorias': 0,
                'totalMinutos': 0
            })
    
    return data

def get_recommended_calories(id):
    data = query(f"SELECT sexo, edad FROM usuarios WHERE idUsuario = {id}")

    genero = data[0]['sexo']
    edad = data[0]['edad']

    MALE = 0
    FEMALE = 1
    OTHER = 2
    if genero == MALE:
        if edad <= 30: return 2700
        if edad <= 50: return 2500
        return 2300
    if genero == FEMALE or genero == OTHER:
        if edad <= 30: return 2200
        if edad <= 50: return 2000
        return 1800

def get_recommended_minutes():
    return 60

@bp.route('/user/health', methods=['GET'])
def get_health():
    idUsuario = request.args.get('id')

    if not idUsuario:
        return not_found_error('id')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('id')
    
    try:
        food_data = get_food_data(idUsuario)
        exercise_data = get_exercise_data(idUsuario)
        rec_calories = get_recommended_calories(idUsuario)
        rec_minutes = get_recommended_minutes()
    except Exception as e:
        return bd_error()
    
    food_score = [0] * 7
    exercise_score = [0] * 7
    for i in range(7):
        real_calories = food_data[i]['total']
        if abs(real_calories - rec_calories) < 200:
            food_score[i] = 1
        else:
            food_score[i] = max(1 - (abs(real_calories - rec_calories) - 200) / 1000, 0)

        real_minutes = exercise_data[i]['totalMinutos']
        if (real_minutes >= rec_minutes):
            exercise_score[i] = 1
        else:
            exercise_score[i] = min(real_minutes / rec_calories, 1)
    
    food_score_prom = sum(food_score) / len(food_score)
    exercise_score_prom = sum(exercise_score) / len(exercise_score)

    final_score = 0.7 * food_score_prom + 0.3 * exercise_score_prom
    return jsonify({
        'score': final_score
    })