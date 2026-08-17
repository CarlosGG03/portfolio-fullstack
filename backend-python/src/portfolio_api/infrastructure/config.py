from pathlib import Path

from dotenv import dotenv_values


ROOT_DIR = Path(__file__).resolve().parents[4]
ENV_FILE = ROOT_DIR / ".env"

_config = dotenv_values(ENV_FILE)

DATABASE_URL = _config["DATABASE_URL"]
