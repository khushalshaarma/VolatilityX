"""Generate mock OHLCV candle data for testing/backtesting and frontend demo."""
import pandas as pd
import numpy as np
import datetime as dt


def generate_mock_candles(symbol: str = "BTCUSDT", n: int = 500, start: dt.datetime | None = None, timeframe: str = "1m"):
    if start is None:
        start = dt.datetime.utcnow() - dt.timedelta(minutes=n)
    times = [start + dt.timedelta(minutes=i) for i in range(n)]
    prices = np.cumsum(np.random.randn(n) * 20 + 0.5) + 20000
    high = prices + np.abs(np.random.randn(n) * 5)
    low = prices - np.abs(np.random.randn(n) * 5)
    open_ = prices + np.random.randn(n) * 2
    close = prices + np.random.randn(n) * 2
    volume = np.abs(np.random.randn(n) * 10)
    df = pd.DataFrame({"ts": times, "open": open_, "high": high, "low": low, "close": close, "volume": volume})
    df = df.set_index("ts")
    return df
