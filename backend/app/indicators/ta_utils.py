"""Technical indicator helpers using pandas and TA-Lib.
These functions accept pandas DataFrame with columns: open, high, low, close, volume
and return series or dataframes to merge.
"""
import numpy as np
import pandas as pd
import talib


def rsi(df: pd.DataFrame, timeperiod: int = 14) -> pd.Series:
    return pd.Series(talib.RSI(df["close"].values, timeperiod=timeperiod), index=df.index)


def ema(df: pd.DataFrame, timeperiod: int = 14) -> pd.Series:
    return pd.Series(talib.EMA(df["close"].values, timeperiod=timeperiod), index=df.index)


def macd(df: pd.DataFrame):
    macd, signal, hist = talib.MACD(df["close"].values)
    return pd.DataFrame({"macd": macd, "signal": signal, "hist": hist}, index=df.index)


def bollinger(df: pd.DataFrame, timeperiod: int = 20):
    upper, mid, lower = talib.BBANDS(df["close"].values, timeperiod=timeperiod)
    return pd.DataFrame({"bb_upper": upper, "bb_mid": mid, "bb_lower": lower}, index=df.index)


def atr(df: pd.DataFrame, timeperiod: int = 14) -> pd.Series:
    return pd.Series(talib.ATR(df["high"].values, df["low"].values, df["close"].values, timeperiod=timeperiod), index=df.index)


def vwap(df: pd.DataFrame) -> pd.Series:
    # volume weighted average price per row (rolling typical price * volume / cumulative volume)
    tp = (df["high"] + df["low"] + df["close"]) / 3
    return (tp * df["volume"]).cumsum() / df["volume"].cumsum()
