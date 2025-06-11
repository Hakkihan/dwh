from flask import abort
from datetime import datetime, date

def validate_date(date_str: str) -> date:
    try:
        parsed = datetime.strptime(date_str, "%Y-%m-%d").date()
        if parsed > date.today():
            abort(400, description="Check-in date cannot be in the future.")
        return parsed
    except ValueError:
        abort(400, description="Invalid date format. Use YYYY-MM-DD.")
