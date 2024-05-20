import './pages/index.css';
import { initialCards } from '../src/scripts/cards.js'
import {creationCard, deleteCard} from '../src/components/card.js'
import {openPopup, closePopup, closePopupCLickEsc, closeOverlayPopup} from '../src/components/modal.js'

const cardContainer = document.querySelector('.places__list')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const profileAddButton = document.querySelector('.profile__add-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const popupCloseButton = document.querySelectorAll('.popup__close')
const formEdit = popupTypeEdit.querySelector('.popup__form')
const editInputName = formEdit.querySelector('.popup__input_type_name')
const editInputDescr = formEdit.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newCardForm = document.querySelector('form[name="new-place"]')
const newInputName = newCardForm.querySelector('.popup__input_type_card-name')
const newInputLink = newCardForm.querySelector('.popup__input_type_url')

window.onload = () => render()

function render() {
    cardContainer.innerHTML = ''
    for(let i = 0; i < initialCards.length; i++){
        const addCard = creationCard(initialCards[i], deleteCard);
        cardContainer.prepend(addCard)
    }
}

popupCloseButton.forEach(function(button) {
    button.addEventListener('click', () => {
        const popupButton = button.closest('.popup')
        closePopup(popupButton)
    })
})

profileEditButton.addEventListener('click', function() {
    openPopup(popupTypeEdit)
})

profileAddButton.addEventListener('click', function() {
    openPopup(popupTypeNewCard)
})

export function openImagePopup(cardLink, cardName) {
    popupImage.src = cardLink
    popupImage.alt = cardName
    popupCaption.textContent = cardName
    openPopup(popupTypeImage)
}

closeOverlayPopup()

function editFormSubmit(evt) {
    evt.preventDefault(); 

    editInputDescr.value

    profileTitle.textContent = editInputName.value
    profileDescription.textContent = editInputDescr.value

    closePopup(popupTypeEdit)
}

formEdit.addEventListener('submit', editFormSubmit)

function addNewCard(evt) {
    evt.preventDefault();
    const newCard = {
        name: newInputName.value,
        link: newInputLink.value
    }

    initialCards.push(newCard)
    render()

    newCardForm.reset()
    closePopup(popupTypeNewCard)
}

newCardForm.addEventListener('submit', addNewCard)




























