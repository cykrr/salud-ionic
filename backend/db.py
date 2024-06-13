from mysql.connector.pooling import MySQLConnectionPool
import mysql.connector.errors
from dotenv import dotenv_values

def create_connection():
    env_vars = dotenv_values(".env.development")

    connection_pool = MySQLConnectionPool(
        pool_size=5,
        pool_reset_session=True,
        host="localhost",
        user=env_vars["DB_USER"],
        password=env_vars["DB_PASSWORD"],
    )
    return connection_pool

def create_db(connection_pool: MySQLConnectionPool):
    connection = connection_pool.get_connection()
    with open('db.sql', 'r', encoding='utf-8') as file:
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

def do_query(db: MySQLConnectionPool, query: str):
    connection = db.get_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("USE app_saludable")
    cursor.execute(query)

    # Select query
    if cursor.description:
        result = cursor.fetchall()
        connection.close()
        return result
    
    # Other queries
    connection.commit()
    connection.close()