from db import *

db = None

def get_db():
    global db
    if not db:
        db = create_connection()
        create_db(db)

    return db

def query(query):
    global db
    return do_query(get_db(), query)


from flask import Flask
import routes.food_add
import routes.exercise_add
import routes.user_food

app = Flask(__name__)
app.register_blueprint(routes.food_add.bp)
app.register_blueprint(routes.exercise_add.bp)
app.register_blueprint(routes.user_food.bp)