import type { Popup } from '../data/mockPopups'

export function renderPopupCard(popup: Popup): string {
  const resources = popup.resources
    .map((resource) => resource.name)
    .join(', ')

  const start = new Date(popup.time_start).toLocaleString()
  const end = new Date(popup.time_end).toLocaleString()

  return `
    <div class="popup-card">
      <h3>${popup.description}</h3>
      <p><strong>Address:</strong> ${popup.street_address}, ${popup.city}, ${popup.province}</p>
      <p><strong>Postal Code:</strong> ${popup.postal_code}</p>
      <p><strong>Start:</strong> ${start}</p>
      <p><strong>End:</strong> ${end}</p>
      <p><strong>Resources Needed:</strong> ${resources}</p>
      <p><strong>Volunteers Signed Up:</strong> ${popup.volunteer_count}</p>
      <button class="btn btn-secondary">View Details</button>
    </div>
  `
}