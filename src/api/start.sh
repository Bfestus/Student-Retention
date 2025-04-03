#!/bin/bash
pip install --no-cache-dir -r src/api/requirements.txt  # Ensure dependencies are installed
python -m uvicorn src.api.main:app --host 0.0.0.0 --port $PORT  # Use full module path
