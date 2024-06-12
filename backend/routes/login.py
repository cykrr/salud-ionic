from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app import app, query
from responses import *
from constants import HASH_LENGTH

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('user')
    password = request.form.get('password')

    if not email:
        return not_found_error('user')
    if not password:
        return not_found_error('password')

    try:
        data = query(f"SELECT idUsuario, usuarios.nombre, roles.nombre as rol FROM usuarios JOIN roles USING(idRol) WHERE correo='{email}' AND clave=SHA2('{password}', {HASH_LENGTH})")
    except Exception as e:
        print(e)
        return bd_error()
    
    if not data:
        return error('Usuario o contraseña incorrectos')
    
    data = data[0]
    access_token = create_access_token(identity=int(data['idUsuario']), additional_claims={"rol": data['rol']})

    return jsonify({"success": True,
                    "message": "Inicio de sesión exitoso",
                    "user": {
                        "idUsuario": data['idUsuario'],
                        "nombre": data['nombre'],
                        "rol": data['rol'],
                        "token": access_token
                    }}), 200
