"""A simplified backtesting engine for rule-based strategies.
It supports buy/sell signals, position sizing, PnL and equity curve calculation.
"""
import pandas as pd
import numpy as np
from typing import Callable, Dict


def run_backtest(df: pd.DataFrame, generate_signal: Callable[[pd.Series], int], initial_capital: float = 10000.0) -> Dict:
    """Run a simple backtest.

    generate_signal: function that receives a row (Series) and returns 1 for buy, -1 for sell, 0 hold
    """
    capital = initial_capital
    position = 0.0
    entry_price = 0.0
    equity_curve = []
    trades = []

    for idx, row in df.iterrows():
        price = row["close"]
        sig = generate_signal(row)
        # simple all-in whole account allocation per signal
        if sig == 1 and position == 0:
            position = capital / price
            entry_price = price
            capital = 0
            trades.append({"type": "buy", "price": price, "size": position, "time": idx})
        elif sig == -1 and position > 0:
            capital = position * price
            trades.append({"type": "sell", "price": price, "size": position, "time": idx, "pnl": (price - entry_price) * position})
            position = 0
        equity = capital + position * price
        equity_curve.append({"time": idx, "equity": equity})

    eq = pd.DataFrame(equity_curve).set_index("time")
    total_return = (eq["equity"].iloc[-1] / initial_capital - 1) * 100
    # win rate
    wins = [t for t in trades if t["type"] == "sell" and t.get("pnl", 0) > 0]
    sells = [t for t in trades if t["type"] == "sell"]
    win_rate = len(wins) / max(1, len(sells)) * 100

    # max drawdown
    peak = eq["equity"].cummax()
    dd = (eq["equity"] - peak) / peak
    max_dd = dd.min() * 100

    # Sharpe approx
    rets = eq["equity"].pct_change().dropna()
    sharpe = (rets.mean() / rets.std() * np.sqrt(252)) if rets.std() != 0 else 0.0

    return {
        "equity_curve": eq,
        "total_return_pct": float(total_return),
        "win_rate_pct": float(win_rate),
        "max_drawdown_pct": float(max_dd),
        "sharpe": float(sharpe),
        "trades": trades,
    }
