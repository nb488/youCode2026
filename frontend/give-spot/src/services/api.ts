const BASE_URL = 'http://localhost:3000/api'

export interface Organizer {
  organizer_id?: number
  name: string
  email: string
  phone_number: string
  password: string
  center_id: number
}

export async function loginOrganizer(email: string, password: string): Promise<Organizer> {
  const response = await fetch(`${BASE_URL}/organizers/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  return data
}