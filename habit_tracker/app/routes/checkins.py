from flask import Blueprint, request, jsonify, abort
from ..models import Habit, CheckIn
from .. import db
from ..helpers import validate_date

checkin_routes = Blueprint("checkin_routes", __name__)

@checkin_routes.route("/habits/<int:habit_id>/check-ins", methods=["POST"])
def create_checkin(habit_id):
    habit = db.session.get(Habit, habit_id)
    if not habit:
        abort(404, description="Habit not found.")

    data = request.get_json()
    date_str = data.get("date")
    if not date_str:
        abort(400, description="Missing 'date' field.")

    checkin_date = validate_date(date_str)

    existing = CheckIn.query.filter_by(habit_id=habit_id, date=checkin_date).first()
    if existing:
        abort(400, description="Check-in already exists for this date.")

    checkin = CheckIn(habit_id=habit_id, date=checkin_date)
    db.session.add(checkin)
    db.session.commit()

    return jsonify({
        "id": checkin.id,
        "habit_id": habit_id,
        "date": checkin.date.isoformat()
    }), 201

@checkin_routes.route("/habits/<int:habit_id>/check-ins", methods=["GET"])
def get_checkins(habit_id):
    habit = db.session.get(Habit, habit_id)
    if not habit:
        abort(404, description="Habit not found.")
    checkins = CheckIn.query.filter_by(habit_id=habit_id).order_by(CheckIn.date).all()
    return jsonify([{"id": ci.id, "date": ci.date.isoformat()} for ci in checkins])

@checkin_routes.route("/habits/<int:habit_id>/check-ins/<int:checkin_id>", methods=["DELETE"])
def delete_checkin(habit_id, checkin_id):
    checkin = CheckIn.query.filter_by(habit_id=habit_id, id=checkin_id).first()
    if not checkin:
        abort(404, description="Check-in not found.")
    db.session.delete(checkin)
    db.session.commit()
    return jsonify({"message": "Check-in deleted."})
