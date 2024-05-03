import requests, json
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

import routes.food_add
import routes.exercise_add
import routes.user_food
import routes.register

app = Flask(__name__)
CORS(app)
app.register_blueprint(routes.food_add.bp)
app.register_blueprint(routes.exercise_add.bp)
app.register_blueprint(routes.user_food.bp)
app.register_blueprint(routes.register.bp)