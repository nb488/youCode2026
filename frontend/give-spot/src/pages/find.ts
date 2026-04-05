import type { Popup } from '../../../../backend/src/types/popup.ts'
import { renderPopupCard } from '../components/popupCard'
import { initializeMap } from '../components/mapView'

let allPopups: Popup[] = []

async function fetchPopups(): Promise<Popup[]> {
  const response = await fetch('http://localhost:3000/api/popups')

  if (!response.ok) {
    throw new Error('Failed to fetch popups')
  }

  return response.json()
}

function renderPopupList(popups: Popup[]): void {
  const listPanel = document.querySelector<HTMLDivElement>('.list-panel')
  if (!listPanel) return

  if (popups.length === 0) {
    listPanel.innerHTML = `
      <div class="empty-state">
        <h3>No GiveSpots found</h3>
        <p>Try changing your city search or resource filter.</p>
      </div>
    `
    return
  }

  listPanel.innerHTML = popups.map(renderPopupCard).join('')
}

function getFilteredPopups(): Popup[] {
  const cityInput = document.getElementById('city-search') as HTMLInputElement | null
  const resourceFilter = document.getElementById('item-filter') as HTMLSelectElement | null

  const cityValue = cityInput?.value.trim().toLowerCase() || ''
  const resourceValue = resourceFilter?.value || 'all'

  return allPopups.filter((popup) => {
    const matchesCity =
      cityValue === '' || popup.city.toLowerCase().includes(cityValue)

    const matchesResource =
      resourceValue === 'all' ||
      popup.resources?.some(
        (resource) => resource.type.toLowerCase() === resourceValue.toLowerCase()
      )

    return matchesCity && matchesResource
  })
}

export async function attachFindPageEvents(): Promise<void> {
  const cityInput = document.getElementById('city-search') as HTMLInputElement | null
  const resourceFilter = document.getElementById('item-filter') as HTMLSelectElement | null
  const listPanel = document.querySelector<HTMLDivElement>('.list-panel')

  try {
    allPopups = await fetchPopups()
    renderPopupList(allPopups)
    initializeMap(allPopups)
  } catch (error) {
    if (listPanel) {
      listPanel.innerHTML = `
        <div class="empty-state">
          <h3>Could not load GiveSpots</h3>
          <p>Please try again later.</p>
        </div>
      `
    }
    console.error(error)
    return
  }

  function applyFilters() {
    const filteredPopups = getFilteredPopups()
    renderPopupList(filteredPopups)
    initializeMap(filteredPopups)
  }

  cityInput?.addEventListener('input', applyFilters)
  resourceFilter?.addEventListener('change', applyFilters)
}

export function renderFindPage(): string {
  return `
    <div class="page">
      <div class="content-container find-layout">
        <nav class="topbar">
          <a href="#home" class="nav-logo">GiveSpot</a>
          <div class="nav-links">
            <a href="#find"class="nav-logo">Find</a>
            <a href="#create"class="nav-logo">Create</a>
          </div>
        </nav>

        <section class="page-header">
          <h1>Find A GiveSpot</h1>
          <p>Browse nearby donation pop-ups around Vancouver.</p>
        </section>

        <section class="filter-bar">
          <input
            id="city-search"
            type="text"
            placeholder="Search by city"
            class="search-input"
          />

          <select id="item-filter" class="filter-select">
            <option value="all">All Items</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Other">Other</option>
          </select>
        </section>

        <section class="find-content">
          <div id="map" class="map-panel"></div>

          <div class="list-panel">
            <div class="empty-state">
              <h3>Loading GiveSpots...</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
}