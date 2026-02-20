AI Quant Trading Intelligence Dashboard

Overview
This repository scaffolds a production-ready AI-powered trading intelligence dashboard.
It includes a Next.js TypeScript frontend, a FastAPI Python backend, basic model training stubs,
indicator computations, a backtesting engine, and example integration with Binance (websocket)
and news sentiment. This is a starting point — components are modular so you can extend them.

Folder layout
- frontend/        Next.js + TypeScript + Tailwind + Lightweight Charts + Zustand
- backend/         FastAPI app, services, indicators, backtest_engine
- models/          model ensemble utilities and model stubs

Quickstart (local dev)
1) Backend
   cd backend
   python -m venv .venv
   .venv\Scripts\activate  # windows
   pip install -r requirements.txt
   cp .env.example .env
   # create DB (Postgres) and set DATABASE_URL in .env
   uvicorn app.main:app --reload --port 8000

2) Frontend
   cd frontend
   npm install
   npm run dev

Environment variables
- .env.example contains the environment variable names used by the backend.

Next steps
- Train real models (see backend/models/train_models.py)
- Wire realtime Binance API keys (BINANCE_API_KEY, BINANCE_SECRET)
- Replace mock data with live data; tune TA-Lib installs as needed

For details, read backend/README.md and frontend/README.md
