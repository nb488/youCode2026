export function renderHomePage(): string {
    return `
    <div class="page">
      <header class="hero">
        <div class="bg-circle-1"></div>
        <div class="bg-circle-2"></div>
        <div class="bg-circle-3"></div>
        <div class="hero-content">
          <h1 class="logo">GiveSpot</h1>
          <p class="tagline">
            Pop-up donation drives and volunteer opportunities
            created by neighbors, for non-profits in need.
          </p>
          <div class="button-group">
            <a href="#find" class="btn btn-primary">
              Find GiveSpot
            </a>
  
            <a href="#create" class="btn btn-secondary">
              Create GiveSpot
            </a>
          </div>
          <p class="subtext">
            Donate nearby or organize a local drive for nonprofits in need.
          </p>
        </div>
      </header>
    </div>
    `
  }