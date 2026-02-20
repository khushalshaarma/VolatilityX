"""Backend FastAPI application package."""
from fastapi import FastAPI
from fastapi.responses import Response

app = FastAPI(title="AI Quant Trading Intelligence Dashboard")


@app.get("/favicon.ico")
async def favicon():
    # Return a tiny SVG favicon so browsers don't 404 the backend root.
    svg = """
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <rect width='32' height='32' rx='6' ry='6' fill='#0b1220'/>
      <text x='50%' y='55%' font-size='18' fill='#60a5fa' text-anchor='middle' font-family='Arial'>T</text>
    </svg>
    """
    return Response(content=svg, media_type="image/svg+xml")

from . import routes  # noqa: E402,F401
