import { useCallback, useState } from 'react'
import { getHealthRecommendations, checkHealth } from '../services/apiService.mock.js'

export default function useHealthRecommendations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recommendations, setRecommendations] = useState(null)

  const getRecommendations = useCallback(async (symptoms) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getHealthRecommendations(symptoms)
      setRecommendations(data)
    } catch (e) {
      setError(e?.message || 'Failed to load recommendations')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearRecommendations = useCallback(() => setRecommendations(null), [])

  const checkServiceHealth = useCallback(async () => {
    try { return await checkHealth() } catch { return { success: false } }
  }, [])

  return { loading, error, recommendations, getRecommendations, clearRecommendations, checkServiceHealth }
}


