"""Fetches news and performs a naive sentiment scoring.
This is a placeholder — replace with a trained sentiment model.
"""
import requests


def fetch_news(query: str, api_key: str, limit: int = 5):
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={api_key}&pageSize={limit}"
    r = requests.get(url)
    if r.status_code != 200:
        return []
    data = r.json().get("articles", [])
    return data


def score_sentiment(text: str) -> float:
    # naive: positive if contains good words
    pos = ["gain", "bull", "surge", "up", "rise"]
    neg = ["drop", "bear", "down", "crash", "fall"]
    t = text.lower()
    s = sum(1 for w in pos if w in t) - sum(1 for w in neg if w in t)
    return max(-1.0, min(1.0, s / 3.0))
