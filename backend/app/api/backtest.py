from fastapi import APIRouter
from pydantic import BaseModel
from ..backtest_engine.simple_backtest import run_backtest
from ..strategy.parser import parse_rule
from ..utils.mock_data import generate_mock_candles

router = APIRouter()


class BacktestRequest(BaseModel):
    rule: str
    initial_capital: float = 10000
    symbol: str = "BTCUSDT"
    timeframe: str = "1m"
    start: str | None = None
    end: str | None = None


@router.post("/backtest")
def backtest(req: BacktestRequest):
    df = generate_mock_candles(req.symbol, 500)

    signal_fn = parse_rule(req.rule)

    def row_signal(row):
        ctx = {
            "rsi": 40,  # placeholder
        }
        return signal_fn(ctx)

    res = run_backtest(df.reset_index(), row_signal, initial_capital=req.initial_capital)
    return {"summary": {"total_return_pct": res["total_return_pct"], "win_rate_pct": res["win_rate_pct"]}, "trades": res["trades"]}
