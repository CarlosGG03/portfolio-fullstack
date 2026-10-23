from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from portfolio_api.application.services import (
    ContactService,
    EducationService,
    ExperienceService,
    ProjectService,
    SkillService,
)
from portfolio_api.domain.schemas import (
    ContactMessageCreate,
    ContactMessageResponse,
    EducationCreate,
    EducationResponse,
    ExperienceCreate,
    ExperienceResponse,
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
    SkillCreate,
    SkillResponse,
)
from portfolio_api.infrastructure.database import get_db

router = APIRouter()


# ==================== PROJECTS ====================
@router.get("/projects", response_model=list[ProjectResponse], tags=["Projects"])
def get_projects(
    featured_only: bool = Query(False, description="Filter only featured projects"),
    db: Session = Depends(get_db),
) -> list[ProjectResponse]:
    return ProjectService.get_all(db, featured_only=featured_only)


@router.get("/projects/{slug}", response_model=ProjectResponse, tags=["Projects"])
def get_project_by_slug(slug: str, db: Session = Depends(get_db)) -> ProjectResponse:
    project = ProjectService.get_by_slug(db, slug)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.post(
    "/projects",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Projects"],
)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)) -> ProjectResponse:
    existing = ProjectService.get_by_slug(db, project_in.slug)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project with this slug already exists",
        )
    return ProjectService.create(db, project_in)


@router.put("/projects/{project_id}", response_model=ProjectResponse, tags=["Projects"])
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db)) -> ProjectResponse:
    project = ProjectService.update(db, project_id, project_in)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Projects"])
def delete_project(project_id: int, db: Session = Depends(get_db)) -> None:
    success = ProjectService.delete(db, project_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")


# ==================== SKILLS ====================
@router.get("/skills", response_model=list[SkillResponse], tags=["Skills"])
def get_skills(db: Session = Depends(get_db)) -> list[SkillResponse]:
    return SkillService.get_all(db)


@router.post(
    "/skills",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Skills"],
)
def create_skill(skill_in: SkillCreate, db: Session = Depends(get_db)) -> SkillResponse:
    return SkillService.create(db, skill_in)


@router.delete("/skills/{skill_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Skills"])
def delete_skill(skill_id: int, db: Session = Depends(get_db)) -> None:
    success = SkillService.delete(db, skill_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")


# ==================== EXPERIENCES ====================
@router.get("/experiences", response_model=list[ExperienceResponse], tags=["Experiences"])
def get_experiences(db: Session = Depends(get_db)) -> list[ExperienceResponse]:
    return ExperienceService.get_all(db)


@router.post(
    "/experiences",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Experiences"],
)
def create_experience(exp_in: ExperienceCreate, db: Session = Depends(get_db)) -> ExperienceResponse:
    return ExperienceService.create(db, exp_in)


@router.delete(
    "/experiences/{exp_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Experiences"],
)
def delete_experience(exp_id: int, db: Session = Depends(get_db)) -> None:
    success = ExperienceService.delete(db, exp_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")


# ==================== EDUCATION ====================
@router.get("/education", response_model=list[EducationResponse], tags=["Education"])
def get_education(db: Session = Depends(get_db)) -> list[EducationResponse]:
    return EducationService.get_all(db)


@router.post(
    "/education",
    response_model=EducationResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Education"],
)
def create_education(edu_in: EducationCreate, db: Session = Depends(get_db)) -> EducationResponse:
    return EducationService.create(db, edu_in)


@router.delete("/education/{edu_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Education"])
def delete_education(edu_id: int, db: Session = Depends(get_db)) -> None:
    success = EducationService.delete(db, edu_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education record not found")


# ==================== CONTACT ====================
@router.post(
    "/contact",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Contact"],
)
def create_contact_message(msg_in: ContactMessageCreate, db: Session = Depends(get_db)) -> ContactMessageResponse:
    return ContactService.create(db, msg_in)


@router.get("/contact/messages", response_model=list[ContactMessageResponse], tags=["Contact"])
def get_contact_messages(db: Session = Depends(get_db)) -> list[ContactMessageResponse]:
    return ContactService.get_all(db)
