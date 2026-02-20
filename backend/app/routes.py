from fastapi import APIRouter
from . import app

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


# import API routes
from .api import predict as predict_api  # noqa: E402
from .api import backtest as backtest_api  # noqa: E402

# include subrouters if any
app.include_router(router, prefix="/api")
app.include_router(predict_api.router, prefix="/api")
app.include_router(backtest_api.router, prefix="/api")
