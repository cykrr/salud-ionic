import mysql.connector
from mysql.connector import MySQLConnection

def create_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
    )
    return connection

def create_db(connection: MySQLConnection):
    with open('db.sql', 'r') as file:
        script = file.read()

    # Dividir el script en consultas individuales
    queries = script.split(';')

    try:
        cursor = connection.cursor()
        for query in queries:
            if query.strip():  # Ignorar líneas en blanco
                cursor.execute(query)
                connection.commit()
        print("Base de datos creada correctamente.")
    except mysql.connector.Error as error:
        print("Error al crear la base de datos:", error)
    except Exception as e:
        print(e)

def do_query(db: MySQLConnection, query: str):
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()