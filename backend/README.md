Backend FastAPI

Structure
- app/                    FastAPI app package
  - main.py               app instance
  - routes.py             top-level routes and api mounts
  - services/             helpers (binance ws)
  - indicators/           TA helpers
  - models/               model stubs and ensemble
  - backtest_engine/      backtesting utilities
  - strategy/             rule parser
  - api/                  API endpoints (predict)

Run
 - Create virtualenv and install requirements: pip install -r requirements.txt
 - Copy .env.example to .env and set DATABASE_URL
 - Start server: uvicorn app.main:app --reload --port 8000
