import type { CreateFormData } from '../types'

export function renderReviewPage(data: CreateFormData): string {
    return `
      <div class="page">
        <div class="content-container">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
            <div class="nav-links">
              <a href="#find" class="nav-logo">Find</a>
              <a href="#create" class="nav-logo">Create</a>
            </div>
          </nav>
  
          <section class="page-header">
            <h1>Review Your GiveSpot</h1>
            <p>Please check the details below before confirming.</p>
          </section>
  
          <div class="review-content" style="margin-top: 2rem;">
            <ul style="list-style: none; padding: 0; font-size: 1.2rem;">
              <li><strong>Organizer Name:</strong> ${data.organizer}</li>
              <li><strong>Contact Info:</strong> ${data.email}</li>
              <li><strong>Contact Info:</strong> ${data.phone}</li>
              <li><strong>Location:</strong> ${data.location}</li>
              <li><strong>Date:</strong> ${data.date}</li>
              <li><strong>Time:</strong> ${data.time}</li>
              <li><strong>Needed Items:</strong> ${data.items}</li>
              <li><strong>Volunteer Spots:</strong> ${data.volunteers}</li>
              <li><strong>Description:</strong> ${data.description}</li>
            </ul>
  
            <div class="button-group" style="margin-top: 2rem; justify-content: center;">
              <a href="#create" class="btn btn-secondary">Edit</a>
              <a href="#confirmation" class="btn btn-primary" id="confirm-btn">Confirm</a>
            </div>
          </div>
        </div>
      </div>
    `
  }