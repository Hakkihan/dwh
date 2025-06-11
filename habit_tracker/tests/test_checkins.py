import pytest
from app import create_app, db

# Can potentially extract this out as shared utility across tests.
@pytest.fixture
def app():
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
        db.drop_all() # TODO (potentially): having persistent data and not dropping the tables on test runs but rather setup/teardown

@pytest.fixture
def client(app):
    return app.test_client()

def test_create_habit(client):
    response = client.post("/habits", json={"name": "Test Habit"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == "Test Habit"
    assert "id" in data

def test_create_habit_empty_name(client):
    response = client.post("/habits", json={"name": ""})
    assert response.status_code == 400

def test_get_all_habits(client):
    client.post("/habits", json={"name": "Habit 1"})
    client.post("/habits", json={"name": "Habit 2"})

    response = client.get("/habits")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 2

def test_get_habit_not_found(client):
    response = client.get("/habits/9999")
    assert response.status_code == 404

def test_delete_habit(client):
    res = client.post("/habits", json={"name": "ToDelete"})
    habit_id = res.get_json()["id"]

    del_res = client.delete(f"/habits/{habit_id}")
    assert del_res.status_code == 200

    get_res = client.get(f"/habits/{habit_id}")
    assert get_res.status_code == 404
