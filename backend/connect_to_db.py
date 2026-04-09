import psycopg2
from config import host, user, password, db_name, port

try:
    connection = psycopg2.connect(
        host=host,
        user=user,
        password=password,
        database=db_name,
        port=port
    )

    cursor = connection.cursor()

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM music_tracks;"
        )
        print(f"Песня: {cursor.fetchone()}")

    pass
except Exception as _ex:
    print("[INFO] Ошибка при подключении к БД", _ex)
finally:
    if connection:
        connection.close()
        print("[INFO] Подключение к бд закрыто")
