import flask
import mysql.connector

def create_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
    )
    return connection

def create_db(connection):
    with open('backend/bd.sql', 'r') as file:
        script = file.read()

    # Dividir el script en consultas individuales
    queries = script.split(';')

    try:
        cursor = connection.cursor()
        for query in queries:
            if query.strip():  # Ignorar líneas en blanco
                cursor.execute(query)
        print("Base de datos creada correctamente.")
    except mysql.connector.Error as error:
        print("Error al crear la base de datos:", error)



connection = create_connection()
create_db(connection)
connection.close()