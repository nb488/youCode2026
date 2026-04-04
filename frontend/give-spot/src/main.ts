import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <header class="hero">
      <div class="hero-content">
        <h1 class="logo">GiveSpot</h1>
        <p class="tagline">
          Making local donation drives easier to find, host, and support.
        </p>

        <div class="button-group">
          <a href="#" class="btn btn-primary">Find a GiveSpot</a>
          <a href="#" class="btn btn-secondary">Create a GiveSpot</a>
        </div>

        <p class="subtext">
          Donate nearby or organize a local drive for nonprofits in need.
        </p>
      </div>
    </header>
  </div>
`