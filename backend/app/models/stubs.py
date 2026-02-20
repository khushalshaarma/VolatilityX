"""Model stubs: simple placeholder implementations for LSTM, XGBoost and Logistic Regression.
These return mock probabilities so the frontend and backtesting can be exercised without heavy ML training.
"""
import numpy as np


def lstm_predict(last_closes: np.ndarray) -> float:
    # naive trend: if last 5 avg > previous 5 avg => bullish
    if len(last_closes) < 10:
        return 0.5
    a = last_closes[-5:].mean()
    b = last_closes[-10:-5].mean()
    diff = (a - b) / b if b != 0 else 0
    p = 0.5 + np.tanh(diff * 10) * 0.5
    return float(np.clip(p, 0.01, 0.99))


def xgb_predict(features: dict) -> float:
    # feature-based simple scoring
    score = 0.5
    score += 0.1 if features.get("ema_crossover", 0) > 0 else -0.1
    score += 0.05 * ((50 - features.get("rsi", 50)) / 50)
    return float(np.clip(score, 0.01, 0.99))


def logreg_predict(features: dict) -> float:
    # logistic of linear combination
    w = 0.3 * (features.get("rsi", 50) - 50) / 50 + 0.2 * features.get("volume_change", 0)
    import math

    p = 1 / (1 + math.exp(-w))
    return float(np.clip(p, 0.01, 0.99))
