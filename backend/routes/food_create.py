from flask import Blueprint, request
from app import query
from responses import *
from constants import FOOD_UNITS

bp = Blueprint('food_create', __name__)


@bp.route('/food/create', methods=['POST'])
def create_food():
    idUsuario = request.form.get('idUsuario')
    nombre = request.form.get('nombre')
    calorias = request.form.get('calorias')
    unidad = request.form.get('unidad')
    porcion = request.form.get('porcion')

    if not idUsuario:
        return not_found_error('idUsuario')
    if not nombre:
        return not_found_error('nombre')
    if not calorias:
        return not_found_error('calorias')
    if not unidad:
        return not_found_error('unidad')
    if not porcion:
        return not_found_error('porcion')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('idUsuario')
    
    try:
        calorias = int(calorias)
    except ValueError:
        return not_int_error('calorias')
    
    try:
        unidad = int(unidad)
    except ValueError:
        return not_int_error('unidad')
    
    try:
        porcion = int(porcion)
    except ValueError:
        return not_int_error('porcion')
    
    calorias = int(calorias * 100 / porcion)

    try:
        query(f"INSERT INTO alimentos (idUsuario, nombre, calorias, unidad) VALUES ({idUsuario}, '{nombre}', {calorias}, {unidad})")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento registrado con éxito")