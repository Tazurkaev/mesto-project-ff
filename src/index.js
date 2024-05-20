import './pages/index.css';
import { initialCards } from '../src/scripts/cards.js'
import {creationCard, deleteCard} from '../src/components/card.js'
import {openPopup, closePopup} from '../src/components/modal.js'

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
const popups = document.querySelectorAll('.popup')


for(let i = 0; i < initialCards.length; i++){
    const addCard = creationCard(initialCards[i], deleteCard, openImagePopup);
    cardContainer.prepend(addCard)
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


function closeOverlayPopup() {
    popups.forEach((popup) => {
       popup.addEventListener('click', (evt) => {
           if(evt.target.classList.contains('popup')) {
             closePopup(popup)
           }
       })
    })
}

closeOverlayPopup()

function editFormSubmit(evt) {
    evt.preventDefault(); 

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

    const card = creationCard(newCard, deleteCard)
    cardContainer.prepend(card)

    newCardForm.reset()
    closePopup(popupTypeNewCard)
}

newCardForm.addEventListener('submit', addNewCard)

function openImagePopup(cardLink, cardName) {
    popupImage.src = cardLink
    popupImage.alt = cardName
    popupCaption.textContent = cardName

    openPopup(popupTypeImage)
}

document.addEventListener('DOMContentLoaded', () => {
    popups.forEach(popup => {
        if (!popup.classList.contains('popup_is-animated')) {
            popup.classList.add('popup_is-animated');
        }
    });
});