/**
 * API Service for Longevita Health Backend
 * Handles communication with the FastAPI backend
 */

const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  /**
   * Make HTTP request to the backend
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get health recommendations based on symptoms
   */
  async getHealthRecommendations(symptoms) {
    try {
      const response = await this.makeRequest('/recommend', {
        method: 'POST',
        body: JSON.stringify({ symptoms }),
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Check if the backend is healthy
   */
  async checkHealth() {
    try {
      const response = await this.makeRequest('/health');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Get basic API info
   */
  async getApiInfo() {
    try {
      const response = await this.makeRequest('/');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
