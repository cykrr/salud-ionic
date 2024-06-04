def not_found_error(param):
    return {"success": False, "message": f"El parámetro {param} es obligatorio"}, 400

def not_int_error(param):
    return {"success": False, "message": f"El parámetro {param} debe ser de tipo entero"}, 400

def date_format_error(param):
    return {"success": False, "message": f"El parámetro {param} debe estar en formato YYYY-MM-DD"}, 400

def bd_error():
    return {"success": False, "message": "Ocurrió un error con la base de datos"}, 400

def unauthorized_error():
    return {"success": False, "message": "Sin permisos suficientes"}, 401

def error(message):
    return {"success": False, "message": message}, 400

def success(message):
    return {"success": True, "message": message}, 200