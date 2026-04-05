export function renderEditCreatePage(): string {
    return `
      <div class="page">
        <div class="content-container edit-create-card">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
            <div class="nav-links">
            </div>
          </nav>
  
          <div class="button-group vertical-buttons">
            <a href="#no-stored-givespot" class="btn btn-primary full-width-btn">Edit/Delete GiveSpot</a>
            <a href="#create" class="btn btn-secondary full-width-btn">Create New GiveSpot</a>
          </div>
        </div>
      </div>
    `
  }