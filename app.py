"""
NOVAX REST API Backend (FastAPI + SQLite + SQLAlchemy)
Full Support for Projects, Articles, Authentication, and Contact Messages
"""

import os
import json
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from models import Base, User, Project, Article, ContactMessage

# Database Configuration (SQLite)
DB_PATH = os.path.join(os.path.dirname(__file__), 'novax.db')
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NOVAX Technology Solutions API",
    description="Official REST API for NOVAX AI Engineering Platform",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Schemas
class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "AI Engineering Student"

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "General Inquiry"
    message: str

class ProjectCreateSchema(BaseModel):
    id: Optional[str] = None
    title_ar: str
    title_en: str
    category: str
    category_label_ar: str
    category_label_en: str
    summary_ar: str
    summary_en: str
    details_ar: str
    details_en: str
    techStack: List[str] = []
    status_ar: Optional[str] = "قيد التطوير"
    status_en: Optional[str] = "In Development"
    icon: Optional[str] = "fa-microchip"

# Seed default data on startup
@app.on_event("startup")
def startup_seed_data():
    db = SessionLocal()
    try:
        # Check if projects exist
        if db.query(Project).count() == 0:
            p1 = Project(
                id="proj-1",
                title_ar="منصة التعلم والتصحيح البرمجي الذكي",
                title_en="Smart CodeLab & AI Debugger",
                category="ai",
                category_label_ar="ذكاء اصطناعي وتعليم",
                category_label_en="AI & EdTech",
                badge="Flagship AI Project",
                summary_ar="منصة تعليمية تفاعلية متكاملة تهدف إلى تعليم البرمجة واختبار مهارات الطلاب بتنفيذ مباشر للأكواد ومساعد ذكي يوجه خطوة بخطوة.",
                summary_en="An interactive intelligent educational platform for teaching programming with in-browser execution and an AI mentor providing guided hints.",
                details_ar="بيئة تعليمية سحابية متكاملة تتيح تنفيذ الأكواد مباشرة مع مساعد ذكي يحلل الأخطاء ويوجه الطالب دون إعطاء الإجابة المباشرة.",
                details_en="An integrated cloud learning environment enabling in-browser execution with Socratic AI guidance.",
                tech_stack=json.dumps(["Python", "C++", "WebAssembly", "AI / LLMs", "WebSockets"]),
                status_ar="قيد التطوير النموذجي",
                status_en="In Active Development",
                icon="fa-code"
            )
            p2 = Project(
                id="proj-2",
                title_ar="منصة دعم المتاجر والمشاريع الصغيرة",
                title_en="SouqNA - Micro-Business Hub",
                category="web",
                category_label_ar="منصات سحابية وتجارة",
                category_label_en="Cloud & E-Commerce",
                badge="SaaS Platform",
                summary_ar="منصة موحدة تجمع أصحاب المشاريع والمتاجر الناشئة لعرض المنتجات والخدمات بسهولة مع نظام اشتراكات مرن وباقات تسويقية ذكية.",
                summary_en="A unified platform empowering small local business owners and startups to showcase their goods with automated marketing tiers.",
                details_ar="منصة إلكترونية متكاملة تدعم رواد الأعمال وأصحاب المشاريع المنزلية وتمنحهم صفحات احترافية فورية ونموذج اشتراك مرن.",
                details_en="A digital ecosystem built to support startups and artisans with instant storefronts and SaaS subscription plans.",
                tech_stack=json.dumps(["Full-Stack Web", "Cloud Database", "Payment Integration", "RESTful APIs"]),
                status_ar="مرحلة التصميم المعماري",
                status_en="Architecture Phase",
                icon="fa-store"
            )
            p3 = Project(
                id="proj-3",
                title_ar='منصة "شَـفـاء" لإدارة الرعاية والفرز الصحي الذكي',
                title_en="Shafaa - Smart Healthcare & AI Triage System",
                category="health",
                category_label_ar="صحة رقمية وذكاء اصطناعي",
                category_label_en="Digital Health & AI",
                badge="Humanitarian & Crisis Health",
                summary_ar="منظومة صحية وطنية ذكية تربط المستشفيات بنظام فرز طبي مدعوم بالذكاء الاصطناعي، وسجل طبي موحد، وتأهيل منزلي رقمي.",
                summary_en="A high-resilience digital health ecosystem featuring AI triage, unified patient records, and digital rehabilitation.",
                details_ar="نظام صحي ذكي موجه لإعادة تنظيم تدفق المرضى وتقليل الاكتظاظ في المستشفيات عبر فرز سريري بالذكاء الاصطناعي وسجل موحد برقم الهوية.",
                details_en="Intelligent crisis health system designed to streamline patient triage, unify medical histories, and provide home rehabilitation.",
                tech_stack=json.dumps(["AI NLP & Dialects", "Distributed Database", "Telehealth WebRTC", "SMS Fallback"]),
                status_ar="النمذجة الأولية والذكاء الاصطناعي",
                status_en="Concept & AI Prototyping",
                icon="fa-heart-pulse"
            )
            db.add_all([p1, p2, p3])
            db.commit()

        # Seed Admin user if none
        if db.query(User).count() == 0:
            admin_user = User(
                name="NOVAX Admin",
                email="admin@novax.tech",
                password="novax2025admin",
                role="Lead Architect"
            )
            db.add(admin_user)
            db.commit()
    finally:
        db.close()

# API Endpoints
@app.get("/")
def read_root():
    return {
        "platform": "NOVAX Technology Solutions API",
        "version": "1.0.0",
        "status": "Online",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "NOVAX Python Backend"}

# --- Authentication ---
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(user_data: RegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email.lower()).first()
    if existing:
        raise HTTPException(status_code=400, detail="البريد الإلكتروني مسجل بالفعل / Email already registered")

    new_user = User(
        name=user_data.name,
        email=user_data.email.lower(),
        password=user_data.password,  # In production, hash with bcrypt
        role=user_data.role or "AI Engineering Student"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user": new_user.to_dict()}

@app.post("/api/auth/login")
def login(creds: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == creds.email.lower()).first()
    if not user or user.password != creds.password:
        raise HTTPException(status_code=401, detail="بيانات الدخول غير صحيحة / Invalid credentials")

    return {"message": "Login successful", "user": user.to_dict()}

# --- Projects ---
@app.get("/api/projects")
def get_projects(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if category and category != "all":
        query = query.filter(Project.category == category)
    projects = query.all()
    return [p.to_dict() for p in projects]

@app.post("/api/projects", status_code=status.HTTP_201_CREATED)
def create_project(data: ProjectCreateSchema, db: Session = Depends(get_db)):
    proj_id = data.id or f"proj-{db.query(Project).count() + 1}"
    new_proj = Project(
        id=proj_id,
        title_ar=data.title_ar,
        title_en=data.title_en,
        category=data.category,
        category_label_ar=data.category_label_ar,
        category_label_en=data.category_label_en,
        summary_ar=data.summary_ar,
        summary_en=data.summary_en,
        details_ar=data.details_ar,
        details_en=data.details_en,
        tech_stack=json.dumps(data.techStack),
        status_ar=data.status_ar,
        status_en=data.status_en,
        icon=data.icon
    )
    db.add(new_proj)
    db.commit()
    db.refresh(new_proj)
    return new_proj.to_dict()

# --- Articles / Blog ---
@app.get("/api/articles")
def get_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).all()
    return [a.to_dict() for a in articles]

# --- Contact Messages ---
@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def submit_contact_message(msg: ContactSchema, db: Session = Depends(get_db)):
    new_msg = ContactMessage(
        name=msg.name,
        email=msg.email,
        subject=msg.subject,
        message=msg.message
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return {"message": "Inquiry recorded successfully", "inquiry": new_msg.to_dict()}

@app.get("/api/contact")
def list_contact_messages(db: Session = Depends(get_db)):
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    return [m.to_dict() for m in messages]
