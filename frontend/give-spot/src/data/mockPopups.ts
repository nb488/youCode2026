export interface Resource {
    resource_id: number
    name: string
    type: string
  }
  
  export interface Volunteer {
    volunteer_id: number
    name: string
  }
  
  export interface Popup {
    center_id: number
    city: string
    province: string
    postal_code: string
    time_start: string
    time_end: string
    description: string
    organizer: string
    resources: Resource[]
    volunteers: Volunteer[]
  }
  
  export const mockPopups: Popup[] = [
    {
      center_id: 1,
      city: "Vancouver",
      province: "BC",
      postal_code: "V5K0A1",
      time_start: "2026-04-05 09:00",
      time_end: "2026-04-05 13:00",
      description: "Downtown donation hub",
      organizer: "Evelyn Thompson",
  
      resources: [
        {resource_id:1, name:"Canned Food", type:"Food"},
        {resource_id:2, name:"Blankets", type:"Clothing"}
      ],
  
      volunteers: [
        {volunteer_id:1, name:"Alice Johnson"},
        {volunteer_id:2, name:"Bob Smith"}
      ]
    }
  ]