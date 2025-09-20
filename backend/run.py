"""
Run script for Longevita Health API
This script handles environment setup and starts the server
"""

import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import openai
        import pydantic
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def check_env_file():
    """Check if environment file exists"""
    env_file = Path(".env")
    if env_file.exists():
        print("✅ Environment file found")
        return True
    else:
        print("⚠️  No .env file found")
        print("Please create a .env file with your OpenAI API key:")
        print("OPENAI_API_KEY=your_api_key_here")
        return False

def load_env():
    """Load environment variables"""
    try:
        from dotenv import load_dotenv
        load_dotenv()
        print("✅ Environment variables loaded")
        return True
    except ImportError:
        print("⚠️  python-dotenv not installed, using system environment variables")
        return True

def main():
    """Main function to start the server"""
    print("🏥 Starting Longevita Health API")
    print("=" * 40)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Load environment
    load_env()
    
    # Check for OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ OPENAI_API_KEY not found in environment variables")
        print("Please set your OpenAI API key:")
        print("export OPENAI_API_KEY=your_api_key_here")
        print("Or create a .env file with the key")
        sys.exit(1)
    
    print("✅ OpenAI API key found")
    
    # Start the server
    print("\n🚀 Starting server on http://localhost:8000")
    print("📚 API documentation available at http://localhost:8000/docs")
    print("🔄 Press Ctrl+C to stop the server")
    print("-" * 40)
    
    try:
        import uvicorn
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
