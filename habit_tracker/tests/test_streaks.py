import pytest
from datetime import date, timedelta
from app import create_app, db

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
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_get_streaks(client):
    res = client.post("/habits", json={"name": "Streak Habit"})
    habit_id = res.get_json()["id"]

    # Create check-ins with a gap: 3 days, skip 1, then 2 days
    today = date.today()
    days = [
        today - timedelta(days=5),
        today - timedelta(days=4),
        today - timedelta(days=3),
        # gap day -2 missing
        today - timedelta(days=1),
        today
    ]

    for d in days:
        client.post(f"/habits/{habit_id}/check-ins", json={"date": d.isoformat()})

    res_streaks = client.get(f"/habits/{habit_id}/streaks")
    assert res_streaks.status_code == 200

    streaks = res_streaks.get_json()
    assert len(streaks) == 2
    assert streaks[0]["days"] == 3
    assert streaks[1]["days"] == 2
