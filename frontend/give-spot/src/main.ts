import './style.css'

import { renderHomePage } from './pages/home'
import { renderFindPage } from './pages/find'
import { renderCreatePage } from './pages/create'
import { renderConfirmationPage } from './pages/confirmation'
import { renderReviewPage } from './pages/review'
import type { CreateFormData } from './types'

let createFormData: CreateFormData | null = null;
let isEditing = false;

function renderPage() {

  const app = document.querySelector<HTMLDivElement>('#app')

  if (!app) return

  const hash = window.location.hash || '#home'

  switch (hash) {

    case '#find':
      app.innerHTML = renderFindPage()
      break

    case '#create':
      if (!isEditing) createFormData = null;
      app.innerHTML = renderCreatePage(createFormData ?? undefined);
      handleCreateForm();
      break

    case '#review':
      if (!createFormData) {
        window.location.hash = '#create'
        return
      }
      app.innerHTML = renderReviewPage(createFormData)

      const editBtn = document.querySelector<HTMLAnchorElement>('#edit-btn')
      editBtn?.addEventListener('click', () => {
        isEditing = true
        window.location.hash = '#create'
      })

      const confirmBtn = document.querySelector<HTMLAnchorElement>('#confirm-btn')
      confirmBtn?.addEventListener('click', () => {
      window.location.hash = '#confirmation'
      })
      break

    case '#confirmation':
      app.innerHTML = renderConfirmationPage()
      break

    case '#home':
    default:
      app.innerHTML = renderHomePage()
      break
  }
}

function handleCreateForm() {
    const form = document.querySelector<HTMLFormElement>('.create-form')
    if (!form) return
  
    const newForm = form.cloneNode(true) as HTMLFormElement
    form.replaceWith(newForm)
  
    newForm.addEventListener('submit', (e) => {
      e.preventDefault()
  
      const formData = new FormData(newForm)
      createFormData = {
        organizer: formData.get('organizer') as string || '',
        email: formData.get('email') as string || '',
        phone: formData.get('phone') as string || '',
        location: formData.get('location') as string || '',
        date: formData.get('date') as string || '',
        time: formData.get('time') as string || '',
        items: formData.get('items') as string || '',
        volunteers: formData.get('volunteers') as string || '',
        description: formData.get('description') as string || '',
      }
  
      isEditing = true
  
      window.location.hash = '#review'
    })
}

window.addEventListener('hashchange', renderPage)
window.addEventListener('load', renderPage)

renderPage()