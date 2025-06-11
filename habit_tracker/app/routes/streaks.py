from flask import Blueprint, jsonify, abort
from sqlalchemy import text
from ..models import Habit
from .. import db
from ..sql.sql_queries import GET_STREAKS_FOR_HABIT 

streak_routes = Blueprint("streak_routes", __name__)

@streak_routes.route("/habits/<int:habit_id>/streaks", methods=["GET"])
def get_streaks(habit_id):
    habit = db.session.get(Habit, habit_id)  
    if not habit:
        abort(404, description="Habit not found.")

    result = db.session.execute(text(GET_STREAKS_FOR_HABIT), {"habit_id": habit_id}).mappings().all()

    streaks = [{
        "first": row["first"],
        "last": row["last"],
        "days": row["days"]
    } for row in result]

    return jsonify(streaks)
