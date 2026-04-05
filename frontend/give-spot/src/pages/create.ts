import type { CreateFormData } from '../types'

export function renderCreatePage(data?: CreateFormData): string {
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
            <h1>Create GiveSpot</h1>
            <p>Organize a local pop-up donation drive in your community.</p>
          </section>
  
          <form class="create-form">
            <label>
              Organizer Name
              <input type="text" name="organizer" placeholder="Enter your name" value="${data?.organizer || ''}" />
            </label>
  
            <label>
              Email
              <input type="text"name="email" placeholder="Email" value="${data?.email || ''}" />
            </label>

            <label>
              Phone Number (Optional)
              <input type="text" name="phone" placeholder="Phone number (optional)" value="${data?.phone || ''}" />
            </label>
  
            <label>
              Location
              <input type="text" name="location" placeholder="e.g. 123 Main St, Vancouver, British Columbia, V5KOA1" value="${data?.location || ''}" />
            </label>
  
            <label>
              Date
              <input type="date" name="date" value="${data?.date || ''}" />
            </label>

            <label>
            Start Time
            <input type="time" name="startTime" required />
            </label>

            <label>
            End Time
            <input type="time" name="endTime" required />
            </label>
  
            <label>
              Needed Items
              <input type="text" name="items" placeholder="e.g. Food, Clothing, Medical Supplies" value="${data?.items || ''}" />
            </label>
  
            <label>
              Volunteer Spots
              <input type="number" name="volunteers" placeholder="Number of volunteers needed" value="${data?.volunteers || ''}" />
            </label>
  
            <label>
              Description
              <textarea name="description" placeholder="Describe the pop-up and its purpose">${data?.description || ''}</textarea>
            </label>
  
            <button type="submit" class="btn btn-primary">Create GiveSpot</button>
          </form>
        </div>
      </div>
    `
  }