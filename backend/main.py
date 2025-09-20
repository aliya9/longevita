"""
Longevita MVP Backend
A simple health recommendation API using FastAPI and OpenAI GPT-4
"""

import os
import json
import logging
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import openai
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Longevita Health API",
    description="AI-powered health recommendations based on symptoms",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pydantic models for request/response validation
class SymptomRequest(BaseModel):
    symptoms: str = Field(..., min_length=1, max_length=1000, description="Description of symptoms or health concerns")

class Recommendation(BaseModel):
    recommendation: str = Field(..., description="Specific health recommendation")
    rationale: str = Field(..., description="Scientific rationale for the recommendation")
    category: str = Field(..., description="Category: diet, lifestyle, or health_tip")

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation] = Field(..., description="List of health recommendations")
    sources: List[str] = Field(..., description="Reliable sources for the recommendations")
    disclaimer: str = Field(..., description="Medical disclaimer")

# Health recommendation prompt template
HEALTH_PROMPT_TEMPLATE = """
You are a knowledgeable health advisor for Longevita, a wellness app. A user has described the following symptoms:

SYMPTOMS: {symptoms}

Please provide 2-3 specific, actionable health recommendations that are:
1. Safe and evidence-based
2. Focus on diet, lifestyle, or simple health tips
3. Practical and easy to implement
4. Not medical advice, but general wellness guidance

For each recommendation, provide:
- A clear, specific recommendation
- A simple scientific rationale explaining why this helps
- The category (diet, lifestyle, or health_tip)

Also provide 1-2 reliable sources from PubMed, WHO, CDC, or NIH that support these recommendations.

Format your response as JSON with this exact structure:
{{
    "recommendations": [
        {{
            "recommendation": "Specific recommendation here",
            "rationale": "Clear explanation of why this helps",
            "category": "diet|lifestyle|health_tip"
        }}
    ],
    "sources": [
        "Source 1: Brief description and URL if available",
        "Source 2: Brief description and URL if available"
    ]
}}

Important guidelines:
- Keep recommendations concise and actionable
- Use plain language for rationales
- Focus on prevention and general wellness
- Never provide specific medical diagnoses or treatments
- Always recommend consulting healthcare professionals for serious concerns
- Ensure all recommendations are safe for general population
"""

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Longevita Health API is running",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "api": "Longevita Health API",
        "version": "1.0.0",
        "openai_configured": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.post("/recommend", response_model=RecommendationResponse)
async def get_health_recommendations(request: SymptomRequest):
    """
    Get AI-powered health recommendations based on symptoms
    
    This endpoint analyzes the provided symptoms and returns evidence-based
    lifestyle and dietary recommendations with scientific rationales.
    """
    try:
        # Validate OpenAI API key
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="OpenAI API key not configured"
            )
        
        # Log the request
        logger.info(f"Processing recommendation request for symptoms: {request.symptoms[:100]}...")
        
        # Prepare the prompt
        prompt = HEALTH_PROMPT_TEMPLATE.format(symptoms=request.symptoms)
        
        # Call OpenAI API
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",  # Using GPT-4o-mini for cost efficiency
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful health advisor. Always respond with valid JSON format as specified in the prompt."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=1000,
                temperature=0.7,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            
            # Extract the response content
            response_content = response.choices[0].message.content.strip()
            logger.info("OpenAI API call successful")
            
        except openai.APIError as e:
            logger.error(f"OpenAI API error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="AI service temporarily unavailable. Please try again later."
            )
        except Exception as e:
            logger.error(f"Unexpected error calling OpenAI: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error while processing request"
            )
        
        # Parse the JSON response
        try:
            parsed_response = json.loads(response_content)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse OpenAI response as JSON: {str(e)}")
            logger.error(f"Raw response: {response_content}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid response format from AI service"
            )
        
        # Validate the response structure
        if not isinstance(parsed_response, dict):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid response structure from AI service"
            )
        
        # Extract recommendations and sources
        recommendations_data = parsed_response.get("recommendations", [])
        sources_data = parsed_response.get("sources", [])
        
        # Validate recommendations
        if not recommendations_data or len(recommendations_data) < 2:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Insufficient recommendations received from AI service"
            )
        
        # Convert to Pydantic models
        recommendations = []
        for rec in recommendations_data[:3]:  # Limit to 3 recommendations
            if not all(key in rec for key in ["recommendation", "rationale", "category"]):
                continue
            recommendations.append(Recommendation(
                recommendation=rec["recommendation"],
                rationale=rec["rationale"],
                category=rec["category"]
            ))
        
        if len(recommendations) < 2:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid recommendation format received from AI service"
            )
        
        # Prepare sources
        sources = sources_data if sources_data else [
            "General wellness guidelines from WHO",
            "Evidence-based health recommendations from CDC"
        ]
        
        # Create response
        response_data = RecommendationResponse(
            recommendations=recommendations,
            sources=sources,
            disclaimer="These recommendations are for general wellness purposes only and should not replace professional medical advice. Please consult with a healthcare provider for serious health concerns."
        )
        
        logger.info(f"Successfully generated {len(recommendations)} recommendations")
        return response_data
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error in recommendation endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return {
        "error": exc.detail,
        "status_code": exc.status_code,
        "message": "Request failed"
    }

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """General exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "error": "Internal server error",
        "status_code": 500,
        "message": "An unexpected error occurred"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
