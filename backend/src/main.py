import asyncpg
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os 
from fastapi import File, UploadFile
from typing import Annotated 

class TrackOut(BaseModel):
    id: int
    title: str

DATABASE_URL = os.getenv("DATABASE_URL", "postgres://postgres:1@localhost/music.db")

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/api/tracks", response_model=List[TrackOut])
async def get_all_tracks():
    """
    Получает список всех треков из базы данных (только id и title).
    """
    try:
        async with app.state.pool.acquire() as connection:
            rows = await connection.fetch("SELECT id, title FROM music_tracks ORDER BY title ASC")
    
            return [TrackOut(id=row['id'], title=row['title']) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при доступе к базе данных: {e}")

@app.post("/api/tracks/upload")
async def upload_track(file: Annotated[UploadFile, File()]):
    if not file:
        raise HTTPException(status_code=400, detail="Файл не был отправлен.")

    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Неверный тип файла. Пожалуйста, загрузите аудио.")

    try:
        audio_data = await file.read()
    
        track_title = file.filename

        async with app.state.pool.acquire() as connection:

            await connection.execute(
                "INSERT INTO music_tracks (title, audio_data) VALUES ($1, $2)",
                track_title,
                audio_data
            )
        
        return {"status": "success", "filename": track_title, "size": len(audio_data)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не удалось сохранить файл: {e}")
    finally:
        await file.close()

import asyncpg
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os 
from fastapi import File, UploadFile
from typing import Annotated 

class TrackOut(BaseModel):
    id: int
    title: str

DATABASE_URL = os.getenv("DATABASE_URL", "postgres://postgres:1@localhost/music.db")

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/api/tracks", response_model=List[TrackOut])
async def get_all_tracks():
    """
    Получает список всех треков из базы данных (только id и title).
    """
    try:
        async with app.state.pool.acquire() as connection:
            rows = await connection.fetch("SELECT id, title FROM music_tracks ORDER BY title ASC")
    
            return [TrackOut(id=row['id'], title=row['title']) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при доступе к базе данных: {e}")

@app.post("/api/tracks/upload")
async def upload_track(file: Annotated[UploadFile, File()]):
    if not file:
        raise HTTPException(status_code=400, detail="Файл не был отправлен.")

    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Неверный тип файла. Пожалуйста, загрузите аудио.")

    try:
        audio_data = await file.read()
    
        track_title = file.filename

        async with app.state.pool.acquire() as connection:

            await connection.execute(
                "INSERT INTO music_tracks (title, audio_data) VALUES ($1, $2)",
                track_title,
                audio_data
            )
        
        return {"status": "success", "filename": track_title, "size": len(audio_data)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не удалось сохранить файл: {e}")
    finally:
        await file.close()