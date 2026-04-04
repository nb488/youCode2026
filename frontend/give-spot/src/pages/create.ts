export function renderCreatePage(): string {
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
              <input type="text" placeholder="Enter your name" />
            </label>
  
            <label>
              Contact Info
              <input type="text" placeholder="Email or phone number" />
            </label>
  
            <label>
              Location
              <input type="text" placeholder="Enter address or neighborhood" />
            </label>
  
            <label>
              Date
              <input type="date" />
            </label>
  
            <label>
              Time
              <input type="time" />
            </label>
  
            <label>
              Needed Items
              <input type="text" placeholder="e.g. menstrual products, jackets, socks" />
            </label>
  
            <label>
              Volunteer Spots
              <input type="number" placeholder="Number of volunteers needed" />
            </label>
  
            <label>
              Description
              <textarea placeholder="Describe the pop-up and its purpose"></textarea>
            </label>
  
            <button type="submit" class="btn btn-primary">Create GiveSpot</button>
          </form>
        </div>
      </div>
    `
  }