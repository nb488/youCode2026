import type { Popup } from '../data/mockPopups'
export function renderPopupCard(popup: Popup): string {

    const resources = popup.resources
      .map(r => r.name)
      .join(', ')
  
    return `
      <div class="popup-card">
  
        <h3>${popup.description}</h3>
  
        <p><strong>Location:</strong>
        ${popup.city}, ${popup.province}</p>
  
        <p><strong>Time:</strong>
        ${popup.time_start} - ${popup.time_end}</p>
  
        <p><strong>Organizer:</strong>
        ${popup.organizer}</p>
  
        <p><strong>Needed Resources:</strong>
        ${resources}</p>
  
        <p><strong>Volunteers:</strong>
        ${popup.volunteers.length}</p>
  
        <button class="btn btn-secondary">
          View Details
        </button>
  
      </div>
    `
  }