"""
SQLAlchemy Data Models for NOVAX Platform
Includes User, Project, Article, and ContactMessage
"""

import json
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Integer
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    role = Column(String(100), default='AI Engineering Student')
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'joined': self.created_at.strftime('%Y-%m-%d')
        }

class Project(Base):
    __tablename__ = 'projects'

    id = Column(String(50), primary_key=True)
    title_ar = Column(String(255), nullable=False)
    title_en = Column(String(255), nullable=False)
    category = Column(String(50), default='ai')
    category_label_ar = Column(String(100), default='ذكاء اصطناعي')
    category_label_en = Column(String(100), default='AI & EdTech')
    badge = Column(String(100), default='Active Project')
    summary_ar = Column(Text, nullable=False)
    summary_en = Column(Text, nullable=False)
    details_ar = Column(Text, nullable=False)
    details_en = Column(Text, nullable=False)
    tech_stack = Column(Text, default='[]')  # JSON array
    status_ar = Column(String(100), default='قيد التطوير')
    status_en = Column(String(100), default='In Development')
    icon = Column(String(50), default='fa-microchip')

    def to_dict(self):
        return {
            'id': self.id,
            'title_ar': self.title_ar,
            'title_en': self.title_en,
            'category': self.category,
            'category_label_ar': self.category_label_ar,
            'category_label_en': self.category_label_en,
            'badge': self.badge,
            'summary_ar': self.summary_ar,
            'summary_en': self.summary_en,
            'details_ar': self.details_ar,
            'details_en': self.details_en,
            'techStack': json.loads(self.tech_stack) if self.tech_stack else [],
            'status_ar': self.status_ar,
            'status_en': self.status_en,
            'icon': self.icon
        }

class Article(Base):
    __tablename__ = 'articles'

    id = Column(String(50), primary_key=True)
    title_ar = Column(String(255), nullable=False)
    title_en = Column(String(255), nullable=False)
    category_ar = Column(String(100), default='ذكاء اصطناعي')
    category_en = Column(String(100), default='AI & Tech')
    read_time_ar = Column(String(50), default='4 دقائق قراءة')
    read_time_en = Column(String(50), default='4 min read')
    date = Column(String(50), default=datetime.utcnow().strftime('%Y-%m-%d'))
    author = Column(String(100), default='NOVAX AI Lab')
    summary_ar = Column(Text, nullable=False)
    summary_en = Column(Text, nullable=False)
    content_ar = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title_ar': self.title_ar,
            'title_en': self.title_en,
            'category_ar': self.category_ar,
            'category_en': self.category_en,
            'readTime_ar': self.read_time_ar,
            'readTime_en': self.read_time_en,
            'date': self.date,
            'author': self.author,
            'summary_ar': self.summary_ar,
            'summary_en': self.summary_en,
            'content_ar': self.content_ar,
            'content_en': self.content_en
        }

class ContactMessage(Base):
    __tablename__ = 'contact_messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), nullable=False)
    subject = Column(String(200), default='General Inquiry')
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': f"msg-{self.id}",
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'date': self.created_at.strftime('%Y-%m-%d %H:%M')
        }
