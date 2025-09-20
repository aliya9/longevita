export async function getHealthRecommendations(symptoms) {
  await delay(400)
  const normalized = Array.isArray(symptoms) ? symptoms : String(symptoms || '').split(',').map(s => s.trim()).filter(Boolean)
  return {
    recommendations: [
      { recommendation: 'Hydrate with electrolyte-rich water', rationale: 'Supports cellular energy and recovery', category: 'Hydration' },
      { recommendation: 'Light 10-minute walk after meals', rationale: 'Improves glucose utilization and digestion', category: 'Activity' },
      { recommendation: 'Ashwagandha 300mg at night', rationale: 'Can reduce perceived stress and improve sleep quality', category: 'Herbal' },
    ],
    sources: [
      'Huberman Lab: Hydration & Electrolytes',
      'ACSM Guidelines for Physical Activity',
      'Randomized trials on Withania somnifera',
    ],
    disclaimer: 'Educational only. Not medical advice. Consult your physician before changes.'
  }
}

export async function checkHealth() {
  await delay(150)
  return { success: true }
}

function delay(ms) { return new Promise(res => setTimeout(res, ms)) }


