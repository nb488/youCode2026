export function renderSignupPage(): string {
    return `
      <div class="page">
        <div class="signup-card">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
          </nav>
  
          <form class="signup-form">
            <label>
              Email
              <input type="email" name="email" placeholder="Enter your email" required />
            </label>
  
            <label>
              Password
              <input type="password" name="password" placeholder="Enter your password" required />
            </label>
  
            <button type="submit" class="btn btn-secondary full-width-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    `
  }