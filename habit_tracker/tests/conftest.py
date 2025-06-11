import sys
import os

# 🔧 Add parent directory to Python path so `app` can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from app import create_app, db
from flask import Flask
from sqlalchemy import event
from sqlalchemy.engine import Engine


# Enforce foreign keys in SQLite (helpful for cascade/delete tests)
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, _):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

@pytest.fixture
def app() -> Flask:
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app: Flask):
    return app.test_client()
