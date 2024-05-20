const popups = document.querySelectorAll('.popup')

export function openPopup(popup) {
    document.addEventListener('keydown', closePopupCLickEsc)
    popup.classList.add('popup_is-animated', 'popup_is-opened')
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

export function closeOverlayPopup() {
    popups.forEach((popup) => {
       popup.addEventListener('click', (evt) => {
           if(evt.target.classList.contains('popup')) {
               closePopup(popup)
           }
       })
    })
}