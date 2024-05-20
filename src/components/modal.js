export function openPopup(popup) {
    document.addEventListener('keydown', closePopupCLickEsc)
    popup.classList.add('popup_is-opened')
}

export function closePopup(popup) {
    document.removeEventListener('keydown', closePopupCLickEsc)
    popup.classList.remove('popup_is-opened')
}

export function closePopupCLickEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'))
    }
}