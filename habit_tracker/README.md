# Mini Habit Tracker API

## Overview

A RESTful API built with Flask and SQLAlchemy for tracking habits and check-ins, including streak calculations via SQL queries.
Check-in dates are validated to not allow future dates.
Proper HTTP status codes and JSON error messages are returned.

Optionally you can build the DockerFile via:

docker build -t mini-habit-tracker .
docker run -p 5000:5000 mini-habit-tracker



## Tech Stack

- Python 3.10+
- Flask 2.x
- SQLAlchemy 2.x (declarative)
- SQLite (for quick dev, can be switched to Postgres)

## Features

- CRUD endpoints for `/habits` and `/habits/<id>/check-ins`
- Validation with HTTP codes and JSON error responses
- streak statistics calculated on-the-fly (`/habits/<id>/streaks`)
- Unit and integration tests using pytest

---

## Setup

### Prerequisites

- Python 3.10 (preferably higher) installed
- (Optional) Docker installed if using Docker

### Installation (Local)

1. Clone the repo:
   ```bash
   git clone <the_repo_url>
   cd <your_preferred_repo_folder>
   ```
2. Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate # Linux/macOS
.\venv\Scripts\activate # Windows

3. Install dependencies
pip install -r requirements.txt

Now your app should (hopefully) be ready to run. Note that ./instance/habit_tracker.db can be viewed with the SQLite VS Code extension.

Each test run starts with a clean slate using in-memory SQLite database (sqlite:///:memory:), which exists only during the lifetime of the connection/app context. For brevity, time wasn't burned on persisting data between test runs and manual usage. We can introduce a more persistent setup where tests setup/teardown more effectively without dropping the tables if needed.