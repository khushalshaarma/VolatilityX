from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import app as _app
from .routes import router as api_router


def create_app() -> FastAPI:
    server = _app
    server.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    server.include_router(api_router, prefix="/api")
    return server


app = create_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
