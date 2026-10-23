from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# ============ Project Schemas ============
class ProjectBase(BaseModel):
    title: str = Field(..., max_length=200)
    slug: str = Field(..., max_length=200)
    summary: str = Field(..., max_length=500)
    description: str
    technologies: str = Field(..., max_length=500, description="Comma-separated technologies")
    github_url: str | None = Field(None, max_length=500)
    live_url: str | None = Field(None, max_length=500)
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = Field(None, max_length=200)
    slug: str | None = Field(None, max_length=200)
    summary: str | None = Field(None, max_length=500)
    description: str | None = None
    technologies: str | None = Field(None, max_length=500)
    github_url: str | None = Field(None, max_length=500)
    live_url: str | None = Field(None, max_length=500)
    featured: bool | None = None
    order: int | None = None


class ProjectResponse(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


# ============ Skill Schemas ============
class SkillBase(BaseModel):
    name: str = Field(..., max_length=100)
    category: str = Field(..., max_length=100)
    proficiency_level: int = Field(80, ge=1, le=100)
    icon: str | None = Field(None, max_length=100)
    order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ============ Experience Schemas ============
class ExperienceBase(BaseModel):
    role: str = Field(..., max_length=200)
    company: str = Field(..., max_length=200)
    location: str | None = Field(None, max_length=200)
    start_date: str = Field(..., max_length=50)
    end_date: str | None = Field(None, max_length=50)
    is_current: bool = False
    description: str
    technologies: str | None = Field(None, max_length=500)
    order: int = 0


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceResponse(ExperienceBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ============ Education Schemas ============
class EducationBase(BaseModel):
    degree: str = Field(..., max_length=200)
    institution: str = Field(..., max_length=200)
    start_year: str = Field(..., max_length=50)
    end_year: str | None = Field(None, max_length=50)
    description: str | None = None
    order: int = 0


class EducationCreate(EducationBase):
    pass


class EducationResponse(EducationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ============ Contact Schemas ============
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    email: str = Field(..., min_length=5, max_length=255)
    subject: str = Field(..., min_length=2, max_length=250)
    message: str = Field(..., min_length=5)


class ContactMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    read: bool
