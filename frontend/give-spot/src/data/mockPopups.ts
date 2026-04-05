export interface Resource {
    name: string
    type: string
  }
  
  export interface Popup {
    center_id: number
    postal_code: string
    street_address: string
    province: string
    city: string
    latitude: number
    longitude: number
    time_start: string
    time_end: string
    description: string
    member_id: number
    resources: Resource[]
    volunteer_count: number
  }
  
  export const mockPopups: Popup[] = [
    {
      center_id: 1,
      postal_code: "V5K0A1",
      street_address: "123 Main St",
      province: "British Columbia",
      city: "Vancouver",
      latitude: 49.2827,
      longitude: -123.1207,
      time_start: "2026-04-05T09:00:00.000Z",
      time_end: "2026-04-05T17:00:00.000Z",
      description: "Downtown donation hub",
      member_id: 1,
      resources: [
        { name: "Canned Food", type: "Food" },
        { name: "Blankets", type: "Clothing" }
      ],
      volunteer_count: 2
    },
    {
      center_id: 2,
      postal_code: "V6B1C2",
      street_address: "456 Robson St",
      province: "British Columbia",
      city: "Vancouver",
      latitude: 49.2800,
      longitude: -123.1150,
      time_start: "2026-04-06T10:00:00.000Z",
      time_end: "2026-04-06T18:00:00.000Z",
      description: "Eastside community center",
      member_id: 2,
      resources: [
        { name: "Rice Bags", type: "Food" },
        { name: "Winter Jackets", type: "Clothing" },
        { name: "First Aid Kits", type: "Medical Supplies" }
      ],
      volunteer_count: 4
    },

    {
        center_id: 3,
        postal_code: "V5H2A1",
        street_address: "789 Kingsway",
        province: "British Columbia",
        city: "Burnaby",
        latitude: 49.2488,
        longitude: -122.9805,
        time_start: "2026-04-07T11:00:00.000Z",
        time_end: "2026-04-07T15:00:00.000Z",
        description: "Burnaby winter essentials drive",
        member_id: 3,
        resources: [
          { name: "Socks", type: "Clothing" }
        ],
        volunteer_count: 1
      }

    
  ]