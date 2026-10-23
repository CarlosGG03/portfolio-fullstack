from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from portfolio_api.infrastructure.database import Base


class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    summary = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(String(500), nullable=False)  # Comma-separated list
    github_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    featured = Column(Boolean, default=False, nullable=False)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class SkillModel(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)  # Frontend, Backend, DevOps, etc.
    proficiency_level = Column(Integer, default=80, nullable=False)  # 1-100
    icon = Column(String(100), nullable=True)
    order = Column(Integer, default=0, nullable=False)


class ExperienceModel(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    location = Column(String(200), nullable=True)
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=True)
    is_current = Column(Boolean, default=False, nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(String(500), nullable=True)
    order = Column(Integer, default=0, nullable=False)


class EducationModel(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String(200), nullable=False)
    institution = Column(String(200), nullable=False)
    start_year = Column(String(50), nullable=False)
    end_year = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)


class ContactMessageModel(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(250), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    read = Column(Boolean, default=False, nullable=False)
