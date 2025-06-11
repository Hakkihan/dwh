# from flask import Blueprint

from .habits import habit_routes
from .checkins import checkin_routes
from .streaks import streak_routes

def register_routes(app):
    app.register_blueprint(habit_routes)
    app.register_blueprint(checkin_routes)
    app.register_blueprint(streak_routes)
