import './style.css'

import { renderHomePage } from './pages/home'
import { renderFindPage } from './pages/find'
import { renderCreatePage } from './pages/create'

function renderPage() {

  const app = document.querySelector<HTMLDivElement>('#app')

  if (!app) return

  const hash = window.location.hash || '#home'

  switch (hash) {

    case '#find':
      app.innerHTML = renderFindPage()
      break

    case '#create':
      app.innerHTML = renderCreatePage()
      break

    case '#home':
    default:
      app.innerHTML = renderHomePage()
      break
  }
}

window.addEventListener('hashchange', renderPage)
window.addEventListener('load', renderPage)