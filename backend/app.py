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



from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from routes import *
from dotenv import dotenv_values

app = Flask(__name__)
app.register_blueprint(food_add.bp)
app.register_blueprint(food_create.bp)
app.register_blueprint(food_get.bp)
app.register_blueprint(exercise_add.bp)
app.register_blueprint(exercise_create.bp)
app.register_blueprint(exercise_get.bp)
app.register_blueprint(user_exercise.bp)
app.register_blueprint(user_food.bp)
app.register_blueprint(user_health.bp)
app.register_blueprint(register.bp)
app.register_blueprint(login.bp)
app.register_blueprint(plots.bp)
CORS(app)

get_db()

env_vars = dotenv_values("../.env.development")
app.config['JWT_SECRET_KEY'] = env_vars['JWT_SECRET_KEY']
JWTManager(app)
