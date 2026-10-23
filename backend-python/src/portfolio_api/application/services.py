from sqlalchemy.orm import Session

from portfolio_api.domain.schemas import (
    ContactMessageCreate,
    EducationCreate,
    ExperienceCreate,
    ProjectCreate,
    ProjectUpdate,
    SkillCreate,
)
from portfolio_api.infrastructure.models import (
    ContactMessageModel,
    EducationModel,
    ExperienceModel,
    ProjectModel,
    SkillModel,
)


# ============ Project Service ============
class ProjectService:
    @staticmethod
    def get_all(db: Session, featured_only: bool = False) -> list[ProjectModel]:
        query = db.query(ProjectModel)
        if featured_only:
            query = query.filter(ProjectModel.featured.is_(True))
        return query.order_by(ProjectModel.order.asc(), ProjectModel.created_at.desc()).all()

    @staticmethod
    def get_by_slug(db: Session, slug: str) -> ProjectModel | None:
        return db.query(ProjectModel).filter(ProjectModel.slug == slug).first()

    @staticmethod
    def get_by_id(db: Session, project_id: int) -> ProjectModel | None:
        return db.query(ProjectModel).filter(ProjectModel.id == project_id).first()

    @staticmethod
    def create(db: Session, project_in: ProjectCreate) -> ProjectModel:
        db_project = ProjectModel(**project_in.model_dump())
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def update(db: Session, project_id: int, project_in: ProjectUpdate) -> ProjectModel | None:
        db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
        if not db_project:
            return None
        update_data = project_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def delete(db: Session, project_id: int) -> bool:
        db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
        if not db_project:
            return False
        db.delete(db_project)
        db.commit()
        return True


# ============ Skill Service ============
class SkillService:
    @staticmethod
    def get_all(db: Session) -> list[SkillModel]:
        return db.query(SkillModel).order_by(SkillModel.category.asc(), SkillModel.order.asc()).all()

    @staticmethod
    def create(db: Session, skill_in: SkillCreate) -> SkillModel:
        db_skill = SkillModel(**skill_in.model_dump())
        db.add(db_skill)
        db.commit()
        db.refresh(db_skill)
        return db_skill

    @staticmethod
    def delete(db: Session, skill_id: int) -> bool:
        db_skill = db.query(SkillModel).filter(SkillModel.id == skill_id).first()
        if not db_skill:
            return False
        db.delete(db_skill)
        db.commit()
        return True


# ============ Experience Service ============
class ExperienceService:
    @staticmethod
    def get_all(db: Session) -> list[ExperienceModel]:
        return db.query(ExperienceModel).order_by(ExperienceModel.order.asc(), ExperienceModel.id.desc()).all()

    @staticmethod
    def create(db: Session, exp_in: ExperienceCreate) -> ExperienceModel:
        db_exp = ExperienceModel(**exp_in.model_dump())
        db.add(db_exp)
        db.commit()
        db.refresh(db_exp)
        return db_exp

    @staticmethod
    def delete(db: Session, exp_id: int) -> bool:
        db_exp = db.query(ExperienceModel).filter(ExperienceModel.id == exp_id).first()
        if not db_exp:
            return False
        db.delete(db_exp)
        db.commit()
        return True


# ============ Education Service ============
class EducationService:
    @staticmethod
    def get_all(db: Session) -> list[EducationModel]:
        return db.query(EducationModel).order_by(EducationModel.order.asc(), EducationModel.id.desc()).all()

    @staticmethod
    def create(db: Session, edu_in: EducationCreate) -> EducationModel:
        db_edu = EducationModel(**edu_in.model_dump())
        db.add(db_edu)
        db.commit()
        db.refresh(db_edu)
        return db_edu

    @staticmethod
    def delete(db: Session, edu_id: int) -> bool:
        db_edu = db.query(EducationModel).filter(EducationModel.id == edu_id).first()
        if not db_edu:
            return False
        db.delete(db_edu)
        db.commit()
        return True


# ============ Contact Service ============
class ContactService:
    @staticmethod
    def get_all(db: Session) -> list[ContactMessageModel]:
        return db.query(ContactMessageModel).order_by(ContactMessageModel.created_at.desc()).all()

    @staticmethod
    def create(db: Session, msg_in: ContactMessageCreate) -> ContactMessageModel:
        db_msg = ContactMessageModel(**msg_in.model_dump())
        db.add(db_msg)
        db.commit()
        db.refresh(db_msg)
        return db_msg

    @staticmethod
    def mark_read(db: Session, msg_id: int) -> ContactMessageModel | None:
        db_msg = db.query(ContactMessageModel).filter(ContactMessageModel.id == msg_id).first()
        if not db_msg:
            return None
        db_msg.read = True
        db.commit()
        db.refresh(db_msg)
        return db_msg
