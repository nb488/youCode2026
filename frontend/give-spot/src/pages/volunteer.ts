import { mockPopups } from '../data/mockPopups'

export function attachVolunteerPageEvents(centerId: number): void {
  const form = document.getElementById('volunteer-form') as HTMLFormElement | null
  if (!form) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const container = document.getElementById('volunteer-form-container')
    if (!container) return

    container.innerHTML = `
  <div class="success-card">
    <h2>Thanks for signing up!</h2>

    <div class="success-actions">
      <a href="#details-${centerId}" class="btn btn-secondary">Back to Details</a>
      <a href="#find" class="btn btn-primary">Find More GiveSpots</a>
    </div>
  </div>
`
  })
}

export function renderVolunteerPage(centerId: number): string {
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
            <p>We couldn’t find the volunteer page you were looking for.</p>
          </section>

          <a href="#find" class="btn btn-primary">Back to Find GiveSpot</a>
        </div>
      </div>
    `
  }

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
          <h1>Volunteer for ${popup.description}</h1>
          <p>Fill out your information to sign up as a volunteer.</p>
        </section>

        <div id="volunteer-form-container">
          <form id="volunteer-form" class="create-form volunteer-form">
            <label>
              Full Name
              <input type="text" placeholder="Enter your full name" required />
            </label>

            <label>
              Email
              <input type="email" placeholder="Enter your email" required />
            </label>

            <div class="card-actions">
              <button type="submit" class="btn btn-primary">Submit</button>
              <a href="#details-${popup.center_id}" class="btn btn-secondary">Back to Details</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}