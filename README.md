AI Quant Trading Intelligence Dashboard (TradAI)

Purpose
This repository provides a starting point for an AI-powered trading intelligence dashboard. It combines a TypeScript/Next.js frontend with a Python/FastAPI backend and includes utilities for indicators, a simple backtesting engine, model stubs, and example integrations (Binance websocket, news sentiment).

Highlights
- Frontend: Next.js + TypeScript + Tailwind + Lightweight Charts + Zustand for client state
- Backend: FastAPI, modular services, indicator computations, simple backtester
- Models: model ensemble utilities and training stubs under `models/`

Repository layout
- `frontend/`  — Next.js app (UI, charts, client state)
- `backend/`   — FastAPI service, routes, services, backtest engine, indicators
- `models/`    — model utilities, stubs and examples
- `docs/`      — platform-specific notes (e.g. `docs/SETUP-WINDOWS.md`)

Requirements
- Node.js (>=16) for frontend
- Python (>=3.10) for backend
- PostgreSQL (optional; backend can run with mock data)

Quick start (local development)
1) Backend (Windows example)
   - Open a terminal
   - cd backend
   - python -m venv .venv
   - .venv\Scripts\activate     # PowerShell: .venv\Scripts\Activate.ps1
   - pip install --upgrade pip
   - pip install -r requirements.txt
   - copy .env.example .env      # update values in .env (DATABASE_URL, API keys)
   - (optional) create Postgres DB and set `DATABASE_URL` in `.env`
   - Start dev server:
     ```
     uvicorn app.main:app --reload --port 8000
     ```

2) Frontend
   - cd frontend
   - npm install
   - npm run dev
   - Open http://localhost:3000

Environment variables
- See `backend/.env.example` for backend variables. Important ones:
  - `DATABASE_URL` — Postgres connection string (optional for mock mode)
  - `BINANCE_API_KEY`, `BINANCE_SECRET` — (optional) for live Binance integration
  - `NEWS_API_KEY` / other keys used by services

Development notes
- The backend ships with mock data under `backend/app/utils/mock_data.py` to let you run the app without external APIs.
- Indicator code and the simple backtester are in `backend/app/indicators` and `backend/app/backtest_engine` respectively.
- Model training stubs and orchestration live in `models/` — implement `train_models.py` and model classes when ready.

Testing
- There are no full test suites included by default. Add pytest-based tests in `backend/tests/` and `frontend/__tests__/` as needed.

Deployment ideas
- Containerize backend and frontend with Docker and use a managed Postgres for production.
- Secure the API keys using environment variables or a secrets manager.

Common tasks & tips
- Run backend with hot reload: `uvicorn app.main:app --reload --port 8000`
- Build frontend for production: `cd frontend && npm run build`
- If you use TA-Lib or other native libs, follow their platform-specific install steps (see `docs/`).

Contributing
- Read `backend/README.md` and `frontend/README.md` for component-specific guidance.
- Open issues for features or bugs; follow the repo's code style.

Where to look next
- Backend entry: `backend/app/main.py`
- Backtester: `backend/app/backtest_engine/simple_backtest.py`
- Strategy parser: `backend/app/strategy/parser.py`
- Frontend entry: `frontend/pages/index.tsx`

License & contact
- This template does not include a license by default — add a `LICENSE` file if you plan to open source the project.
- For questions, search the codebase or open an issue in the repository.

Acknowledgements
- This project combines open-source libraries and patterns to provide a quick scaffold for ML-driven trading dashboards.

Enjoy building with TradAI — extend the modular pieces (models, services, UI) to match your workflow.
