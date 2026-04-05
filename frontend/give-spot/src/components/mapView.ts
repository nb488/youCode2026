import L from 'leaflet'
import type { Popup } from '../../../../backend/src/types/popup.ts'

let map: L.Map | null = null

export function initializeMap(popups: Popup[]) {
  const mapContainer = document.getElementById('map')
  if (!mapContainer) return

  if (map) {
    map.remove()
    map = null
  }

  map = L.map('map').setView([49.2827, -123.1207], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  popups.forEach((popup) => {
    const marker = L.circleMarker([popup.latitude, popup.longitude], {
      radius: 8,
    }).addTo(map!)

    marker.bindPopup(`
      <strong>${popup.description}</strong><br />
      ${popup.street_address}, ${popup.city}<br />
      Volunteers: ${popup.volunteers?.length || 0}
    `)

    marker.on('click', () => {
      const card = document.getElementById(`popup-card-${popup.popup_id}`)
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
        card.classList.add('highlight-card')

        setTimeout(() => {
          card.classList.remove('highlight-card')
        }, 1500)
      }
    })
  })
}