import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from flask import Blueprint, Response, request, jsonify
from app import query
from responses import *
from datetime import date, timedelta
from io import BytesIO

bp = Blueprint('plots', __name__)

def create_plot(data):
    today = date.today()
    days = []
    calories = []
    for i in range(7):
        fecha = today - timedelta(days=6-i)
        days.append(fecha)

        found = False
        for j in range(len(data)):
            if fecha == data[j]['fecha']:
                calories.append(data[j]['total'])
                found = True
                break

        if not found:
            calories.append(0)

    days = ["hoy" if fecha == today else fecha.strftime("%d/%m") for fecha in days]

    plt.plot(days, calories)
    plt.xticks(rotation=45)

    img = BytesIO()
    plt.savefig(img, format='png', bbox_inches='tight')
    plt.clf()
    img.seek(0)

    return img


@bp.route('/plot/food', methods=['GET'])
def get_food_plot():
    idUsuario = request.args.get('id')

    if not idUsuario:
        return not_found_error('id')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('id')

    try:
        data = query(f"SELECT SUM(cantidad * calorias / 100) as total, fecha FROM alimentosUsuario JOIN alimentos USING(idAlimento) WHERE alimentosUsuario.idUsuario = {idUsuario} AND fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) GROUP BY fecha")
    except Exception as e:
        print(e)
        return bd_error()
    
    img = create_plot(data)

    return Response(img, mimetype='image/png')


@bp.route('/plot/exercise', methods=['GET'])
def get_exercise_plot():
    idUsuario = request.args.get('id')

    if not idUsuario:
        return not_found_error('id')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('id')

    try:
        data = query(f"SELECT SUM(minutos * calorias / 60) as total, fecha FROM ejerciciosUsuario JOIN ejercicios USING(idEjercicio) WHERE ejerciciosUsuario.idUsuario = {idUsuario} AND fecha >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) GROUP BY fecha")
    except Exception as e:
        print(e)
        return bd_error()
    
    img = create_plot(data)

    return Response(img, mimetype='image/png')