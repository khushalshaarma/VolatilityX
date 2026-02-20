"""Simple ensemble combining LSTM, XGBoost and Logistic Regression outputs.
Each model returns probability of bullish direction and a confidence score.
"""
from typing import Dict


def weighted_ensemble(preds: Dict[str, float], weights: Dict[str, float] = None) -> Dict[str, float]:
    """Combine model outputs using weighted average.

    preds: {"lstm": p_bull, "xgb": p_bull, "logreg": p_bull}
    weights: weights per model; defaults equal weights
    returns: {bull_pct, bear_pct, confidence, risk}
    """
    if weights is None:
        weights = {k: 1.0 for k in preds}

    total_w = sum(weights.values())
    bull = sum(preds[k] * weights.get(k, 0) for k in preds) / total_w
    bear = 1.0 - bull

    # confidence is weighted variance complement
    import math

    vals = [preds[k] for k in preds]
    mean = sum(vals) / len(vals)
    var = sum((v - mean) ** 2 for v in vals) / len(vals)
    confidence = max(0.0, 1.0 - math.sqrt(var)) * 100

    # risk heuristic
    if confidence > 75 and abs(bull - 0.5) > 0.1:
        risk = "Low"
    elif confidence > 50:
        risk = "Medium"
    else:
        risk = "High"

    return {"bull_pct": bull * 100, "bear_pct": bear * 100, "confidence": confidence, "risk": risk}
