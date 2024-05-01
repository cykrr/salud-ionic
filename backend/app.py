from flask import Flask, request, g, current_app
from db import *

app = Flask(__name__)

def get_db():
    if 'db' not in g:
        g.db = create_connection()
        create_db(g.db)

    return g.db

@app.route('/products', methods=['POST'])
def get_product():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("USE app_saludable")
    cursor.execute("INSERT INTO alimentos (nombre, calorias) VALUES ('Abdominales', 50)")
    db.commit()