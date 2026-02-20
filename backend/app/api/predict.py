from fastapi import APIRouter
from pydantic import BaseModel
from ..models import stubs, ensemble
import numpy as np

router = APIRouter()


class PredictRequest(BaseModel):
    last_closes: list[float]
    rsi: float | None = None
    macd: float | None = None
    volume_change: float | None = None
    ema_crossover: int | None = 0


class PredictResponse(BaseModel):
    bull_pct: float
    bear_pct: float
    confidence: float
    risk: str


@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    lc = np.array(req.last_closes)
    p1 = stubs.lstm_predict(lc)
    p2 = stubs.xgb_predict({"rsi": req.rsi or 50, "ema_crossover": req.ema_crossover})
    p3 = stubs.logreg_predict({"rsi": req.rsi or 50, "volume_change": req.volume_change or 0})
    res = ensemble.weighted_ensemble({"lstm": p1, "xgb": p2, "logreg": p3})
    return PredictResponse(bull_pct=res["bull_pct"], bear_pct=res["bear_pct"], confidence=res["confidence"], risk=res["risk"])
