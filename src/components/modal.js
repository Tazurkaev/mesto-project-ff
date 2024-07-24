
export function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEscape)
    popup.classList.add('popup_is-opened')
}

export function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEscape)
    popup.classList.remove('popup_is-opened')
  
}

export function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'))
    }
}