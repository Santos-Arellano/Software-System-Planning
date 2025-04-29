FROM python:3.9-slim

WORKDIR /app

COPY app.py .

RUN mkdir -p /app/history

RUN chmod -R 755 /app

ENTRYPOINT ["python", "app.py"]