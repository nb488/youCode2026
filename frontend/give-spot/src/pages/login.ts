import { loginOrganizer } from '../services/api'

export function renderLoginPage(): string {
  return `
    <div class="page">
      <div class="login-card">
        <nav class="topbar">
          <a href="#home" class="nav-logo">GiveSpot</a>
        </nav>

        <section class="page-header">
          <h1>Organizer Login</h1>
        </section>

        <div id="login-message"></div>

        <form id="login-form" class="login-form">
          <label>
            Email
            <input id="login-email" type="email" name="email" placeholder="Enter your email" required />
          </label>

          <label>
            Password
            <input id="login-password" type="password" name="password" placeholder="Enter your password" required />
          </label>

          <button type="submit" class="btn btn-primary full-width-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  `
}

export function attachLoginPageEvents(): void {
    console.log('attachLoginPageEvents ran')
  const form = document.getElementById('login-form') as HTMLFormElement | null
  const message = document.getElementById('login-message') as HTMLDivElement | null

  if (!form || !message) return

  form.addEventListener('submit', async (event) => {
    console.log('form submitted')
    event.preventDefault()

    const emailInput = document.getElementById('login-email') as HTMLInputElement | null
    const passwordInput = document.getElementById('login-password') as HTMLInputElement | null

    if (!emailInput || !passwordInput) return

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    message.innerHTML = `<p>Logging in...</p>`

    try {
      const organizer = await loginOrganizer(email, password)

      localStorage.setItem('loggedInOrganizer', JSON.stringify(organizer))

      message.innerHTML = `
        <div class="success-card">
          <h2>Login successful!</h2>
          <p>Welcome, ${organizer.name}.</p>
        </div>
      `

      setTimeout(() => {
        window.location.hash = '#create'
      }, 1000)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed'

      message.innerHTML = `
        <div class="error-card">
          <p>${errorMessage}</p>
        </div>
      `
    }
  })
}