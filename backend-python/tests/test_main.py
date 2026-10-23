import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from portfolio_api.infrastructure.database import Base, get_db
from portfolio_api.main import app

# Create in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_and_get_projects() -> None:
    project_payload = {
        "title": "Portfolio Full Stack",
        "slug": "portfolio-fullstack",
        "summary": "Professional portfolio with Next.js, FastAPI and .NET",
        "description": "Comprehensive project showcasing Clean Architecture, CI/CD, and Docker",
        "technologies": "Next.js, FastAPI, ASP.NET Core, PostgreSQL, Docker",
        "github_url": "https://github.com/CarlosGG03/portfolio-fullstack",
        "live_url": "https://portfolio.carlosgarzon.dev",
        "featured": True,
        "order": 1,
    }
    # Create project
    create_res = client.post("/api/projects", json=project_payload)
    assert create_res.status_code == 201
    created_data = create_res.json()
    assert created_data["slug"] == "portfolio-fullstack"
    assert created_data["id"] is not None

    # Get all projects
    get_res = client.get("/api/projects")
    assert get_res.status_code == 200
    projects = get_res.json()
    assert len(projects) == 1
    assert projects[0]["title"] == "Portfolio Full Stack"

    # Get by slug
    slug_res = client.get("/api/projects/portfolio-fullstack")
    assert slug_res.status_code == 200
    assert slug_res.json()["title"] == "Portfolio Full Stack"

    # Test duplicate slug rejection
    dup_res = client.post("/api/projects", json=project_payload)
    assert dup_res.status_code == 400


def test_skills_and_experiences_and_contact() -> None:
    # 1. Skill
    skill_res = client.post(
        "/api/skills",
        json={
            "name": "FastAPI",
            "category": "Backend",
            "proficiency_level": 90,
            "icon": "fastapi",
            "order": 1,
        },
    )
    assert skill_res.status_code == 201
    assert len(client.get("/api/skills").json()) == 1

    # 2. Experience
    exp_res = client.post(
        "/api/experiences",
        json={
            "role": "Senior Software Engineer",
            "company": "Tech Corp",
            "location": "Remote",
            "start_date": "2023-01",
            "is_current": True,
            "description": "Leading full-stack engineering initiatives.",
            "technologies": "Python, TypeScript, React, Docker",
            "order": 1,
        },
    )
    assert exp_res.status_code == 201
    assert len(client.get("/api/experiences").json()) == 1

    # 3. Education
    edu_res = client.post(
        "/api/education",
        json={
            "degree": "B.S. Computer Engineering",
            "institution": "University",
            "start_year": "2019",
            "end_year": "2023",
            "description": "Software Engineering specialization",
            "order": 1,
        },
    )
    assert edu_res.status_code == 201
    assert len(client.get("/api/education").json()) == 1

    # 4. Contact Message
    msg_res = client.post(
        "/api/contact",
        json={
            "name": "Recruiter Jane",
            "email": "jane@example.com",
            "subject": "Senior Full Stack Opportunity",
            "message": "Hi Carlos, we loved your portfolio!",
        },
    )
    assert msg_res.status_code == 201
    assert len(client.get("/api/contact/messages").json()) == 1
