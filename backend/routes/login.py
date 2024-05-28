from flask import Blueprint, request, jsonify
from app import query
from responses import *
from constants import FOOD_UNITS

bp = Blueprint('login', __name__)

@bp.route('/login', methods=['POST'])
def login():
    email = request.form.get('user')
    password = request.form.get('password')

    if not email:
        return not_found_error('user')
    if not password:
        return not_found_error('password')

    try:
        data = query(f"SELECT idUsuario, nombre FROM usuarios WHERE correo='{email}' AND clave='{password}'")
    except Exception as e:
        print(e)
        return bd_error()

    if not data:
        return error('Usuario o contraseña incorrectos')

    return jsonify({"success": True,
                    "message": "Inicio de sesión exitoso",
                    "user": {
                        "idUsuario": data[0]['idUsuario'],
                        "nombre": data[0]['nombre']
                    }}), 200
