import asyncpg
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os # Для чтения настроек из переменных окружения
from fastapi import File, UploadFile
from typing import Annotated # Более современный способ для File и UploadFile

# --- Модели данных (Pydantic) ---
# Эта модель определяет, какие данные мы будем отправлять клиенту
class TrackOut(BaseModel):
    id: int
    title: str

# --- Настройки подключения к БД ---
# Лучше хранить их в переменных окружения, а не в коде
DATABASE_URL = os.getenv("DATABASE_URL", "postgres://postgres:1@localhost/music.db")

app = FastAPI()

# --- Настройка CORS ---
# Это КРАЙНЕ ВАЖНО! Без этого ваш React-приложение (с другого порта)
# не сможет делать запросы к бэкенду.
origins = [
    "http://localhost:3000", # Адрес вашего React-приложения
    "localhost:3000"
    "http://192.168.31.144:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Глобальные события для управления пулом соединений ---
@app.on_event("startup")
async def startup():
    # Создаем пул соединений при старте приложения
    app.state.pool = await asyncpg.create_pool(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    # Закрываем пул соединений при остановке
    await app.state.pool.close()


# --- API Эндпоинт для получения списка треков ---
@app.get("/api/tracks", response_model=List[TrackOut])
async def get_all_tracks():
    """
    Получает список всех треков из базы данных (только id и title).
    """
    try:
        async with app.state.pool.acquire() as connection:
            # Выполняем запрос, чтобы получить только нужные поля
            rows = await connection.fetch("SELECT id, title FROM music_tracks ORDER BY title ASC")
            
            # Преобразуем результат в список объектов TrackOut
            # Pydantic автоматически сконвертирует это в JSON
            return [TrackOut(id=row['id'], title=row['title']) for row in rows]
    except Exception as e:
        # В случае ошибки возвращаем стандартный код 500
        raise HTTPException(status_code=500, detail=f"Ошибка при доступе к базе данных: {e}")

# Можно добавить и другие эндпоинты, например, для получения аудио
# @app.get("/api/tracks/{track_id}/audio")
# async def get_track_audio(track_id: int):
#     # ... здесь будет логика для отдачи audio_data ...
#     pass


@app.post("/api/tracks/upload")
async def upload_track(file: Annotated[UploadFile, File()]):
    """
    Принимает аудиофайл от клиента, считывает его
    и сохраняет в базу данных.
    """
    if not file:
        raise HTTPException(status_code=400, detail="Файл не был отправлен.")

    # Проверяем, что это аудиофайл (базовая проверка)
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Неверный тип файла. Пожалуйста, загрузите аудио.")

    try:
        # Считываем содержимое файла в виде байтов
        audio_data = await file.read()
        
        # Используем имя файла как название трека
        track_title = file.filename

        async with app.state.pool.acquire() as connection:
            # Выполняем SQL-запрос для вставки данных
            # Используем $1, $2 для защиты от SQL-инъекций
            await connection.execute(
                "INSERT INTO music_tracks (title, audio_data) VALUES ($1, $2)",
                track_title,
                audio_data
            )
        
        return {"status": "success", "filename": track_title, "size": len(audio_data)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не удалось сохранить файл: {e}")
    finally:
        # Важно закрыть файл после работы с ним
        await file.close()