from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from portfolio_api.api.routes.health import router as health_router
from portfolio_api.api.routes.portfolio import router as portfolio_router
from portfolio_api.infrastructure.database import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    # Ensure tables are created if running with direct DB or tests
    try:
        Base.metadata.create_all(bind=engine)
    except Exception:
        # Fallback or silent if DB is down during build/lint steps
        pass
    yield


app = FastAPI(
    title="Portfolio API",
    description="Backend API for Portfolio personal information, projects, skills and contact",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local/production MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(portfolio_router, prefix="/api")
