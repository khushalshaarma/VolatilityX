"""Light wrapper to connect to Binance websocket for kline/candlestick streams."""
import asyncio
import json
from typing import Callable

from websockets import connect


class BinanceWS:
    def __init__(self, symbol: str = "btcusdt", interval: str = "1m"):
        self.symbol = symbol.lower()
        self.interval = interval
        self._url = f"wss://stream.binance.com:9443/ws/{self.symbol}@kline_{self.interval}"

    async def run(self, on_message: Callable[[dict], None]):
        async with connect(self._url) as ws:
            async for msg in ws:
                data = json.loads(msg)
                on_message(data)


async def sample():
    async def print_msg(m):
        print(m)

    client = BinanceWS("btcusdt", "1m")
    await client.run(print_msg)


if __name__ == "__main__":
    asyncio.run(sample())
