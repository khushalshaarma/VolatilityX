-- Simple schema for users, portfolios, trades, and market data
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name TEXT NOT NULL,
    cash NUMERIC NOT NULL DEFAULT 10000
);

CREATE TABLE IF NOT EXISTS trades (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id),
    symbol TEXT NOT NULL,
    side TEXT NOT NULL,
    price NUMERIC NOT NULL,
    size NUMERIC NOT NULL,
    pnl NUMERIC,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS market_candles (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    ts TIMESTAMP WITH TIME ZONE NOT NULL,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC
);
