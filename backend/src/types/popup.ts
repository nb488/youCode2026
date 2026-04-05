export interface Resource {
    resource_id?: number
    popup_id?: number
    name: string
    type: string
  }
  
  export interface Volunteer {
    volunteer_id?: number
    name: string
    email: string
    phone_number?: string
  }
  
  export interface Popup {
    popup_id: number
    name: string
    description: string
    street_address: string
    city: string
    province: string
    postal_code: string
    latitude: number
    longitude: number
    time_start: string
    time_end: string
    volunteers_needed: number
    organizer_id: number
    resources: Resource[]
    volunteers: Volunteer[]
  }