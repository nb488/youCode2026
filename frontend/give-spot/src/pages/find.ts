import { mockPopups } from '../data/mockPopups'
import { renderPopupCard } from '../components/popupCard'

export function renderFindPage(): string {
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
          <h1>Find GiveSpot</h1>
          <p>Browse nearby donation pop-ups and find what’s needed.</p>
        </section>

        <section class="filter-bar">
          <input type="text" placeholder="Search by item or neighborhood" class="search-input" />
          <select class="filter-select">
            <option>All Items</option>
            <option>Clothing</option>
            <option>Hygiene Products</option>
            <option>Food</option>
          </select>
        </section>

        <section class="popup-list">
          ${mockPopups.map(renderPopupCard).join('')}
        </section>
      </div>
    </div>
  `
}