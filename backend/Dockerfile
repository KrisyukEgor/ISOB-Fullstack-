FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn whitenoise

COPY . .

RUN DJANGO_SECRET_KEY=temporary_key_for_build python manage.py collectstatic --noinput

CMD python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
