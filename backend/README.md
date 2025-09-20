# 🏥 Longevita Health API

A simple MVP backend for health recommendations using FastAPI and OpenAI GPT-4.

## Features

- **AI-Powered Recommendations**: Uses OpenAI GPT-4o-mini for intelligent health suggestions
- **Evidence-Based**: Provides scientific rationales and reliable sources
- **Simple API**: Single `/recommend` endpoint for easy integration
- **Production Ready**: Includes error handling, validation, and logging
- **CORS Enabled**: Ready for frontend integration

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Environment

Create a `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Or set environment variable:
```bash
export OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run the Server

```bash
python run.py
```

Or directly with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Test the API

```bash
python test_api.py
```

## API Endpoints

### `GET /`
Health check endpoint
```json
{
  "message": "Longevita Health API is running",
  "version": "1.0.0",
  "status": "healthy"
}
```

### `GET /health`
Detailed health check
```json
{
  "status": "healthy",
  "api": "Longevita Health API",
  "version": "1.0.0",
  "openai_configured": true
}
```

### `POST /recommend`
Get health recommendations based on symptoms

**Request:**
```json
{
  "symptoms": "I have frequent headaches and feel tired"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "recommendation": "Increase water intake to 8-10 glasses daily",
      "rationale": "Dehydration is a common cause of headaches and fatigue",
      "category": "lifestyle"
    },
    {
      "recommendation": "Ensure 7-9 hours of quality sleep nightly",
      "rationale": "Inadequate sleep directly impacts energy levels and can trigger headaches",
      "category": "lifestyle"
    }
  ],
  "sources": [
    "WHO Guidelines on Sleep and Health",
    "CDC Recommendations for Hydration"
  ],
  "disclaimer": "These recommendations are for general wellness purposes only..."
}
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

Run the test script to verify everything works:

```bash
python test_api.py
```

This will test:
- Health check endpoint
- Recommendation endpoint with various symptoms
- Response validation

## Example Usage

### Using curl:
```bash
curl -X POST "http://localhost:8000/recommend" \
     -H "Content-Type: application/json" \
     -d '{"symptoms": "I have trouble sleeping and feel anxious"}'
```

### Using Python requests:
```python
import requests

response = requests.post(
    "http://localhost:8000/recommend",
    json={"symptoms": "I have digestive issues after meals"}
)

data = response.json()
for rec in data["recommendations"]:
    print(f"- {rec['recommendation']}")
    print(f"  Why: {rec['rationale']}")
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `DEBUG`: Debug mode (default: True)

### Model Configuration

The API uses `gpt-4o-mini` by default for cost efficiency. To change the model, modify the `model` parameter in `main.py`:

```python
response = client.chat.completions.create(
    model="gpt-4",  # Change to gpt-4 for better quality
    # ... other parameters
)
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input format
- **500 Internal Server Error**: Server-side errors
- **503 Service Unavailable**: OpenAI API issues
- **422 Unprocessable Entity**: Validation errors

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in environment
2. Use a production ASGI server like Gunicorn
3. Set up proper logging
4. Configure CORS for your frontend domain
5. Use environment variables for sensitive data

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## License

This project is part of the Longevita health application.
