// pages/confirmation.ts
export function renderNoStoredGiveSpotPage(): string {
    return `
      <div class="page">
        <div class="content-container">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
            <div class="nav-links">
            </div>
          </nav>
  
          <section class="page-header">
            <h1>You don't have any givespots. Go back and create one before you need to edit!</h1>
          </section>
            <div class="button-group" style="margin-top: 2rem; justify-content: center;">
              <a href="#edit-create" class="btn btn-primary">Back</a>
            </div>
          </div>
        </div>
      </div>
    `
  }