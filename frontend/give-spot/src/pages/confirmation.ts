// pages/confirmation.ts
export function renderConfirmationPage(): string {
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
            <h1>GiveSpot Created!</h1>
            <p>Your donation drive has been successfully created. Thank you for helping your community!</p>
          </section>
  
          <div class="confirmation-content" style="text-align: center; margin-top: 2rem;">
            <span class="logo" style="font-size: 6rem; background: linear-gradient(45deg, #61c2e5, #aceac7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎉</span>
  
            <p style="margin-top: 1.5rem; font-size: 1.2rem;">You can now view your GiveSpot or go back to the homepage.</p>
  
            <div class="button-group" style="margin-top: 2rem; justify-content: center;">
              <a href="#home" class="btn btn-primary">Go Home</a>
              <a href="#find" class="btn btn-secondary">View GiveSpots</a>
            </div>
          </div>
        </div>
      </div>
    `
  }