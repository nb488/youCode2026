export function renderLoginSignupPage(): string {
    return `
      <div class="page">
        <div class="content-container login-signup-card">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
            <div class="nav-links">
            </div>
          </nav>
  
          <div class="button-group vertical-buttons">
            <a href="#login" class="btn btn-primary full-width-btn">Log In</a>
            <a href="#signup" class="btn btn-secondary full-width-btn">Sign Up</a>
          </div>
        </div>
      </div>
    `
  }