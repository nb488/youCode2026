import { mockPopups } from '../data/mockPopups'
import { renderPopupCard } from '../components/popupCard'

export function renderFindPage(): string {
  return `
    <div class="page">
      <div class="content-container find-layout">
        <nav class="topbar">
          <a href="#home" class="nav-logo">GiveSpot</a>
          <div class="nav-links">
            <a href="#find">Find</a>
            <a href="#create">Create</a>
          </div>
        </nav>

        <section class="page-header">
          <h1>Find GiveSpot</h1>
          <p>Browse nearby donation pop-ups around Vancouver.</p>
        </section>

        <section class="filter-bar">
          <input
            id="neighbourhood-search"
            type="text"
            placeholder="Search by neighbourhood"
            class="search-input"
          />

          <select id="item-filter" class="filter-select">
            <option value="all">All Items</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical Supplies">Medical Supplies</option>
          </select>
        </section>

        <section class="find-content">
          <div id="map" class="map-panel"></div>

          <div class="list-panel">
            ${mockPopups.map(renderPopupCard).join('')}
          </div>
        </section>
      </div>
    </div>
  `
}