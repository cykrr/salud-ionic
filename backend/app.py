from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, get_jwt_identity
from dotenv import dotenv_values
from datetime import timedelta
import requests
from db import *

db = None
region_data = None

def get_db():
    global db
    if not db:
        db = create_connection()
        create_db(db)

    return db

def query(query):
    global db
    return do_query(get_db(), query)

def get_region_data():
    global region_data
    url = 'https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json'
    if not region_data:
        region_data = requests.get(url).json()
    return region_data


app = Flask(__name__)
CORS(app, expose_headers=['Token'])

get_db()

env_vars = dotenv_values("../.env.development")
app.config['JWT_SECRET_KEY'] = env_vars['JWT_SECRET_KEY']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=1)

jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwt(response):
    try:
        access_token = create_access_token(identity=get_jwt_identity(), additional_claims={"rol": get_jwt()["rol"]})
        response.headers['Token'] = access_token
        return response
    except (RuntimeError, KeyError):
        return response
    

from routes import *