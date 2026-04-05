import './style.css'
import 'leaflet/dist/leaflet.css'

import { renderHomePage } from './pages/home'
import { renderFindPage, attachFindPageEvents } from './pages/find'
import { renderCreatePage } from './pages/create'
import { renderDetailsPage } from './pages/details'
import { renderVolunteerPage, attachVolunteerPageEvents } from './pages/volunteer'
import { renderConfirmationPage } from './pages/confirmation'
import { renderReviewPage } from './pages/review'
import { mockPopups } from './data/mockPopups'
import { initializeMap } from './components/mapView'
import type { CreateFormData } from './types'
import { renderLoginSignupPage } from './pages/login_signup'
import { renderLoginPage , attachLoginPageEvents } from './pages/login'
import { renderSignupPage } from './pages/signup'
import { renderEditCreatePage } from './pages/edit_create'
import { renderNoStoredGiveSpotPage } from './pages/no_stored_givespot'

let isLoggedIn = false;
let createFormData: CreateFormData | null = null;
let isEditing = false;

function renderPage() {

  const app = document.querySelector<HTMLDivElement>('#app')

  if (!app) return

  const hash = window.location.hash || '#home'

  if (hash.startsWith('#details-')) {
    const centerId = Number(hash.replace('#details-', ''))
    app.innerHTML = renderDetailsPage(centerId)
    return
  }

  if (hash.startsWith('#volunteer-')) {
    const centerId = Number(hash.replace('#volunteer-', ''))
    app.innerHTML = renderVolunteerPage(centerId)
    attachVolunteerPageEvents(centerId)
    return
  }

  switch (hash) {

    case '#find':
      app.innerHTML = renderFindPage()
      initializeMap(mockPopups)
      attachFindPageEvents()
      break

    case '#login':
      app.innerHTML = renderLoginPage()
      attachLoginPageEvents()
      handleLoginForm()
      break

    case '#signup':
      app.innerHTML = renderSignupPage()
      handleSignupForm()
      break

    case '#edit-create': 
      if (!isEditing) createFormData = null;
      app.innerHTML = renderEditCreatePage();
      break

    case '#login-signup':
      app.innerHTML = renderLoginSignupPage();

      const loginBtn = document.querySelector<HTMLAnchorElement>('.btn-primary');
      const signupBtn = document.querySelector<HTMLAnchorElement>('.btn-secondary');

      loginBtn?.addEventListener('click', () => {
        window.location.hash = '#login';
      });

      signupBtn?.addEventListener('click', () => {
        window.location.hash = '#signup';
      });
      break;

    case '#no-stored-givespot':
      app.innerHTML = renderNoStoredGiveSpotPage();
      break;

    case '#create':
    if (!isLoggedIn) {
      window.location.hash = '#login-signup';
      return;
    }
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

function handleLoginForm() {
    const form = document.querySelector<HTMLFormElement>('.login-form')
    if (!form) return
  
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
  
      console.log('Login attempt:', { email, password })
  
      isLoggedIn = true
      window.location.hash = '#edit-create'
    })
}

function handleSignupForm() {
    const form = document.querySelector<HTMLFormElement>('.signup-form')
    if (!form) return
  
    form.addEventListener('submit', (e) => {
      e.preventDefault()
  
      const formData = new FormData(form)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
  
      console.log('Signup successful:', { email, password })
  
      window.location.hash = '#login-signup'
    })
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