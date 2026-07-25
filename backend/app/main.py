from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import firebase

from app.routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://moneysence-innova.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {"status": "Backend Running"}