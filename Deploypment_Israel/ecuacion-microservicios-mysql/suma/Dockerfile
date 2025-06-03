FROM python:3.12-slim
WORKDIR /microservicios
COPY suma.py .
RUN pip install --no-cache-dir fastapi uvicorn pydantic requests setuptools>=78.1.1 pip>=23.3
RUN useradd -m appuser
USER appuser
CMD ["uvicorn", "suma:app", "--host", "0.0.0.0", "--port", "8000"]