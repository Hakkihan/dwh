# Use official Python 3.10 slim image as base
FROM python:3.10-slim

# Set environment variables to ensure output is flushed immediately
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# Set work directory inside container
WORKDIR /app

# Copy requirements first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run"]
