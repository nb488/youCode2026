import { mockPopups } from '../data/mockPopups'

export function renderDetailsPage(centerId: number): string {
  const popup = mockPopups.find((p) => p.center_id === centerId)

  if (!popup) {
    return `
      <div class="page">
        <div class="content-container">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
            <div class="nav-links">
              <a href="#find">Find</a>
              <a href="#create">Create</a>
            </div>
          </nav>

          <section class="page-header">
            <h1>GiveSpot Not Found</h1>
            <p>We couldn’t find the GiveSpot you were looking for.</p>
          </section>

          <a href="#find" class="btn btn-primary">Back to Find GiveSpot</a>
        </div>
      </div>
    `
  }

  const resources = popup.resources
    .map(
      (resource) => `
        <li><strong>${resource.name}</strong> (${resource.type})</li>
      `
    )
    .join('')

  const start = new Date(popup.time_start).toLocaleString()
  const end = new Date(popup.time_end).toLocaleString()

  return `
    <div class="page">
      <div class="content-container">
        <nav class="topbar">
          <a href="#home" class="nav-logo">GiveSpot</a>
          <div class="nav-links">
            <a href="#find">Find</a>
            <a href="#create">Create</a>
          </div>
        </nav>

        <section class="page-header">
          <h1>${popup.description}</h1>
          <p>View full details for this GiveSpot.</p>
        </section>

        <div class="details-card">
          <p><strong>Address:</strong> ${popup.street_address}, ${popup.city}, ${popup.province}</p>
          <p><strong>Postal Code:</strong> ${popup.postal_code}</p>
          <p><strong>Start Time:</strong> ${start}</p>
          <p><strong>End Time:</strong> ${end}</p>
          <p><strong>Volunteers Signed Up:</strong> ${popup.volunteer_count}</p>

          <div class="details-section">
            <h3>Resources Needed</h3>
            <ul class="resource-list">
              ${resources}
            </ul>
          </div>

          <div class="card-actions">
            <a href="#volunteer-${popup.center_id}" class="btn btn-primary">I Want to Volunteer</a>
            <a href="#find" class="btn btn-secondary">Back to Find GiveSpot</a>
          </div>
        </div>
      </div>
    </div>
  `
}