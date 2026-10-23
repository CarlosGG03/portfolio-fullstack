import os
from pathlib import Path

from dotenv import dotenv_values

ROOT_DIR = Path(__file__).resolve().parents[4]
ENV_FILE = ROOT_DIR / ".env"

_config = dotenv_values(ENV_FILE) if ENV_FILE.exists() else {}

DATABASE_URL: str = os.getenv(
    "DATABASE_URL",
    _config.get(
        "DATABASE_URL",
        "postgresql+psycopg://portfolio:Anacar0312@localhost:5433/portfolio",
    ),
)
