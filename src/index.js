import './pages/index.css'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openPopup, closePopup, closePopupByEscape } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { getCardsOnServer, getUser, createNewCard, updateAvatar, updateProfile } from './components/api.js';



const placesList = document.querySelector('.places__list')

const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeImage = document.querySelector('.popup_type_image')
 
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')

const popups = document.querySelectorAll('.popup')
const popupCloseButtons = document.querySelectorAll('.popup__close')

const editProfile = popupTypeEdit.querySelector('form[name="edit-profile"]')
const popupInputTypeName = editProfile.querySelector('.popup__input_type_name')
const popupInputTypeDescription = editProfile.querySelector('.popup__input_type_description')
const profileDescription = document.querySelector('.profile__description')
const profileTitle = document.querySelector('.profile__title')

const newPlace = popupTypeNewCard.querySelector('form[name="new-place"]')
const popupInputTypeCardName = newPlace.querySelector('.popup__input_type_card-name')
const popupInputTypeUrl = newPlace.querySelector('.popup__input_type_url')
const profileAvatar = document.querySelector('.profile__image')
const popupTypeAvatar = document.querySelector('.popup_type_avatar')
const avatarForm = popupTypeAvatar.querySelector('.popup__form')
const avatarInput = avatarForm.querySelector('.popup__input_type_url')
const avatarIcon = document.querySelector('.avatar__icon')



let currentUser

Promise.all(([getUser(), getCardsOnServer()]))
.then(([user, cardArr]) => {
    console.log(user)
    currentUser = user
    handingUser(user)
    cardArr.forEach(card => {
        placesList.append(createCard(card, openImagePopup, user._id))
    })
   
})
.catch((error) => {
    console.log(error)
})

function handingUser(user) {
    profileTitle.textContent = user.name
    profileDescription.textContent = user.about
    profileAvatar.src = user.avatar
}

profileEditButton.addEventListener('click', () => {
    popupInputTypeName.value = profileTitle.textContent
    popupInputTypeDescription.value = profileDescription.textContent
    openPopup(popupTypeEdit)
    clearValidation(editProfile)
})

profileAddButton.addEventListener('click', () => {
    openPopup(popupTypeNewCard)
    clearValidation(newPlace)
    newPlace.reset()
})

enableValidation(validationConfig);

function openImagePopup(link, name) {
    popupImage.src = link
    popupImage.alt = name
    popupCaption.textContent = name

    openPopup(popupTypeImage)

}

popupCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
       const popups = button.closest('.popup')
       closePopup(popups)
    })
})

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup)
        }
    })
})

function editProfileSubmit (evt) {
    evt.preventDefault()

    const nameValue = popupInputTypeName.value
    const descValue = popupInputTypeDescription.value
    const buttonSave = editProfile.querySelector('.popup__button')
    const initialButtonText = buttonSave.textContent

    buttonSave.textContent = "Сохранение..."
    

    updateProfile(nameValue, descValue)
    .then((profileData) => {
        handingUser(profileData)
        closePopup(popupTypeEdit)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        buttonSave.textContent = initialButtonText
    })
    

}

editProfile.addEventListener('submit', editProfileSubmit )

function addNewCard(evt) {
    evt.preventDefault()
    const nameValue = popupInputTypeCardName.value
    const urlValue = popupInputTypeUrl.value

    const buttonSave = newPlace.querySelector('.popup__button')
    const initialButtonText = buttonSave.textContent

    buttonSave.textContent = "Сохранение..."

    createNewCard(nameValue, urlValue)
    .then((card) => {
        placesList.prepend(createCard(card, openImagePopup, currentUser._id))
        closePopup(popupTypeNewCard)
        newPlace.reset()
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        buttonSave.textContent = initialButtonText
    })
}


newPlace.addEventListener('submit', addNewCard)

document.addEventListener('DOMContentLoaded', () => {
    popups.forEach(popup => {
        if (!popup.classList.contains('popup_is-animated')) {
            popup.classList.add('popup_is-animated')
        }
    })
})

// Настройки валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    namePattern: /^[A-Za-zА-Яа-яЁё0-9 -]+$/,
    placeNamePattern: /^[A-Za-zА-Яа-яЁё0-9 -]{2,30}$/,
    descriptionPattern: /^[A-Za-zА-Яа-яЁё0-9 -]{2,200}$/ 
};
enableValidation(validationConfig);


avatarIcon.addEventListener('click', () => openPopup(popupTypeAvatar))

function avatarFormSubmit(e) {
    e.preventDefault()
    const buttonSave = avatarForm.querySelector('.popup__button')
    const initialButtonText = buttonSave.textContent

    buttonSave.textContent = "Сохранение..."

    const avatarValue = avatarInput.value
    updateAvatar(avatarValue)
    .then((avatarData) => {
        profileAvatar.src = avatarData.avatar
        closePopup(popupTypeAvatar)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        buttonSave.textContent = initialButtonText
    })
}

avatarForm.addEventListener('submit', avatarFormSubmit)

