from flask import request
from flask_jwt_extended import jwt_required, get_jwt
from app import app, query
from responses import *

@app.route('/food/delete', methods=['DELETE'])
@jwt_required()
def delete_food():
    id_alimento = request.form.get('idAlimento')

    if not id_alimento:
        return not_found_error('idAlimento')
    
    try:
        id_alimento = int(id_alimento)
    except ValueError:
        return not_int_error('idAlimento')
    
    user_data = get_jwt()
    if user_data["rol"] != "administrador":
        return unauthorized_error()
    
    try:
        query(f"UPDATE alimentos SET habilitado = 0 WHERE idAlimento = {id_alimento}")
    except Exception as e:
        print(e)
        return bd_error()
    
    return success("Alimento eliminado con éxito")