import { useState, useCallback } from 'react';
import apiService from '../services/apiService';

/**
 * Custom hook for health recommendations
 * Provides easy-to-use functions for AI-powered health suggestions
 */
export const useHealthRecommendations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  /**
   * Get health recommendations for given symptoms
   */
  const getRecommendations = useCallback(async (symptoms) => {
    if (!symptoms || symptoms.trim().length === 0) {
      setError('Please provide symptoms to get recommendations');
      return null;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await apiService.getHealthRecommendations(symptoms);
      
      if (result.success) {
        setRecommendations(result.data);
        return result.data;
      } else {
        setError(result.error || 'Failed to get recommendations');
        return null;
      }
    } catch (err) {
      const errorMessage = 'Failed to connect to health service. Please try again.';
      setError(errorMessage);
      console.error('Error getting recommendations:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if the backend service is available
   */
  const checkServiceHealth = useCallback(async () => {
    try {
      const result = await apiService.checkHealth();
      return result.success;
    } catch (err) {
      console.error('Health check failed:', err);
      return false;
    }
  }, []);

  /**
   * Clear current recommendations and error
   */
  const clearRecommendations = useCallback(() => {
    setRecommendations(null);
    setError(null);
  }, []);

  /**
   * Get quick wellness tips (using a generic symptoms query)
   */
  const getQuickTips = useCallback(async () => {
    return getRecommendations('general wellness and health maintenance tips');
  }, [getRecommendations]);

  return {
    loading,
    error,
    recommendations,
    getRecommendations,
    checkServiceHealth,
    clearRecommendations,
    getQuickTips,
  };
};

export default useHealthRecommendations;
