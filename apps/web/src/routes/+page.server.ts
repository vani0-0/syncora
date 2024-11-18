import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/')

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return { data }
  }
  catch (error) {
    console.error('Error fetching data:', error)
    return { error: `Failed to fetch data from the API ${error}` }
  }
}
