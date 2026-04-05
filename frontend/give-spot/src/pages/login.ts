export function renderLoginPage(): string {
    return `
      <div class="page">
        <div class="login-card">
          <nav class="topbar">
            <a href="#home" class="nav-logo">GiveSpot</a>
          </nav>
  
          <form class="login-form">
            <label>
              Email
              <input type="email" name="email" placeholder="Enter your email" required />
            </label>
  
            <label>
              Password
              <input type="password" name="password" placeholder="Enter your password" required />
            </label>
  
            <button type="submit" class="btn btn-primary full-width-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    `
  }