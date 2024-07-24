// const TOKEN   = 'ee5a5ed8-4cfc-4624-9b7e-582704811bef'

const TOKEN   = 'eb14567d-74ac-4303-a0f6-6df50f0228b2'
const COHORT  = 'wff-cohort-18'

const config = {
  url: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}


export function getUser() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function getCardsOnServer() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function updateProfile(name, about) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function createNewCard(name, link) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function deleteCardOnServer(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function updateAvatar(avatar) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function addCardLike(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}

export function unlikeCard(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })
}