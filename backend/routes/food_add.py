from flask import Blueprint, request
from app import query
from responses import *
from util import validate_date

bp = Blueprint('food_add', __name__)


@bp.route('/food/add', methods=['POST'])
def add_food():
    idAlimento = request.form.get('idAlimento')
    idUsuario = request.form.get('idUsuario')
    cantidad = request.form.get('cantidad')
    fecha = request.form.get('fecha')

    if not idAlimento:
        return not_found_error('idAlimento')
    if not idUsuario:
        return not_found_error('idUsuario')
    if not cantidad:
        return not_found_error('cantidad')
    if not fecha:
        return not_found_error('fecha')
    
    try:
        idAlimento = int(idAlimento)
    except ValueError:
        return not_int_error('idAlimento')
    
    try:
        idUsuario = int(idUsuario)
    except ValueError:
        return not_int_error('idUsuario')
    
    try:
        cantidad = int(cantidad)
    except ValueError:
        return not_int_error('cantidad')
    
    if not validate_date(fecha):
        return date_format_error('fecha')
    
    try:
        query(f"INSERT INTO alimentosUsuario (idAlimento, idUsuario, cantidad, fecha) VALUES ({idAlimento}, {idUsuario}, {cantidad}, '{fecha}')")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento registrado con éxito")