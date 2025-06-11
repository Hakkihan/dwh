from flask import Blueprint, request, jsonify, abort
from ..models import Habit
from .. import db

habit_routes = Blueprint("habit_routes", __name__)

@habit_routes.route("/habits", methods=["POST"])
def create_habit():
    data = request.get_json()
    name = data.get("name", "").strip()

    if not name:
        abort(400, description="Habit name cannot be empty.")

    habit = Habit(name=name)
    db.session.add(habit)
    db.session.commit()

    return jsonify({"id": habit.id, "name": habit.name}), 201

@habit_routes.route("/habits", methods=["GET"])
def get_all_habits():
    habits = Habit.query.all()
    return jsonify([{"id": h.id, "name": h.name} for h in habits])

@habit_routes.route("/habits/<int:habit_id>", methods=["GET"])
def get_habit(habit_id):
    habit = db.session.get(Habit, habit_id)
    if not habit:
        abort(404, description="Habit not found.")
    return jsonify({"id": habit.id, "name": habit.name})

@habit_routes.route("/habits/<int:habit_id>", methods=["DELETE"])
def delete_habit(habit_id):
    habit = db.session.get(Habit, habit_id)
    if not habit:
        abort(404, description="Habit not found.")
    db.session.delete(habit)
    db.session.commit()
    return jsonify({"message": "Habit deleted."}), 200
