import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openPopup, closePopup, closePopupByEscape } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { getCardsOnServer, getUser, newCard, updateAvatar, updateProfile } from './components/api.js';
import { error } from 'jquery';


const placesList = document.querySelector('.places__list')

const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeImage = document.querySelector('.popup_type_image')
 
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')

const popups = document.querySelectorAll('.popup')
const popupClosebtn = document.querySelectorAll('.popup__close')

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

let currentUser

Promise.all(([getUser(), getCardsOnServer()]))
.then(([user, cardArr]) => {
    console.log(user)
    currentUser = user
    handingUser(user)
    cardArr.forEach(card => {
        placesList.append(createCard(card, imagePopup, user._id))
    })
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
})

enableValidation(validationConfig);

function imagePopup(link, name) {
    popupImage.src = link
    popupCaption.textContent = name

    openPopup(popupTypeImage)

}

popupClosebtn.forEach((button) => {
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

function profile(evt) {
    evt.preventDefault()

    const nameValue = popupInputTypeName.value
    const descValue = popupInputTypeDescription.value
    const buttonSave = editProfile.querySelector('.popup__button')
    const initialButtonText = buttonSave.textContent

    buttonSave.textContent = "Сохранение..."
    

    updateProfile(nameValue, descValue)
    .then((profileData) => {
        handingUser(profileData)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        buttonSave.textContent = initialButtonText
    })
    closePopup(popupTypeEdit)

}

editProfile.addEventListener('submit', profile)

function addNewCard(evt) {
    evt.preventDefault()
    const nameValue = popupInputTypeCardName.value
    const urlValue = popupInputTypeUrl.value

    const buttonSave = newPlace.querySelector('.popup__button')
    const initialButtonText = buttonSave.textContent

    buttonSave.textContent = "Сохранение..."

    newCard(nameValue, urlValue)
    .then((card) => {
        placesList.prepend(createCard(card, imagePopup, currentUser._id))
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
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);


profileAvatar.addEventListener('click', () => openPopup(popupTypeAvatar))

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












// document.addEventListener('DOMContentLoaded', () => {
//     popups.forEach(popup => {
//         if (!popup.classList.contains('popup_is-animated')) {
//             popup.classList.add('popup_is-animated');
//         }
//     });
// });




// const cardTemplate = document.querySelector('#card-template').content
// const placesList = document.querySelector('.places__list')

// const popupTypeEdit = document.querySelector('.popup_type_edit')
// const popupTypeNewCard = document.querySelector('.popup_type_new-card')
// const popupTypeImage = document.querySelector('.popup_type_image')

// const profileEditButton = document.querySelector('.profile__edit-button')
// const profileAddButton = document.querySelector('.profile__add-button')

// const popupImage = popupTypeImage.querySelector('.popup__image')
// const popupCaption = popupTypeImage.querySelector('.popup__caption')

// const popupClosebtn = document.querySelectorAll('.popup__close')
// const popups = document.querySelectorAll('.popup')

// const editProfile = document.querySelector('form[name="edit-profile"]')
// const popupInputTypeName = editProfile.querySelector('.popup__input_type_name')
// const popupInputTypeDescription = editProfile.querySelector('.popup__input_type_description')
// const profileDescription = document.querySelector('.profile__description')
// const profileTitle = document.querySelector('.profile__title')

// const newPlace = document.querySelector('form[name="new-place"]')
// const popupInputTypeCardName = newPlace.querySelector('.popup__input_type_card-name')
// const popupInputTypeUrl = newPlace.querySelector('.popup__input_type_url')




// function createCard (card, deleteCard) {
//     const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true)
//     const cardImage = placesItem.querySelector('.card__image')
//     const cardTitle = placesItem.querySelector('.card__title')
//     const button = placesItem.querySelector('.card__delete-button')
//     const cardLikeButton = placesItem.querySelector('.card__like-button')

//     cardLikeButton.addEventListener('click', likeCard)


//     button.addEventListener('click', () => {
//         deleteCard(placesItem)
//     })

//     cardImage.addEventListener('click', () => {
//         imagePopup(card.link, card.name)
//     })

//     cardImage.src = card.link
//     cardTitle.textContent = card.name
     
    

//     return placesItem
// }

// function deleteCard (card) {
//     card.remove()
// }

// for (let i = 0; i < initialCards.length; i++) {
//     placesList.prepend(createCard(initialCards[i], deleteCard))
// }




// function openPopup (popup) {
//     document.addEventListener('keydown', closePopupByEscape)
//     popup.classList.add('popup_is-opened')
// }

// function closePopup (popup) {
//     document.removeEventListener('keydown', closePopupByEscape)
//     popup.classList.remove('popup_is-opened')
// }


// profileEditButton.addEventListener('click', () => {
//     openPopup(popupTypeEdit)
// })

// profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard))


// function imagePopup (link, name) {
//     popupImage.src = link
//     popupCaption.textContent = name

//     openPopup(popupTypeImage)
// }

// popupClosebtn.forEach((button) => {
//     button.addEventListener('click', () => {
//         const popups = button.closest('.popup')
//         closePopup(popups)
//     })
// })

// function closePopupByEscape(evt) {
//     if (evt.key === 'Escape') {
//         closePopup(document.querySelector('.popup_is-opened'))
//     }
// }f

// popups.forEach((popup) => {
//     popup.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup')) {
//             closePopup(popup)
//         }
//     })
// })


// function Profile(evt) {
//     evt.preventDefault()
//     const nameValue = popupInputTypeName.value
//     const descriptionValue = popupInputTypeDescription.value

//     profileTitle.textContent = nameValue
//     profileDescription.textContent = descriptionValue

//     closePopup(popupTypeEdit)
// }


// editProfile.addEventListener('submit', Profile)


// function addNewCard(evt) {
//     evt.preventDefault()
//     const nameValue = popupInputTypeCardName.value
//     const urlValue = popupInputTypeUrl.value
//     const newCard = {
//         name: nameValue,
//         link: urlValue
//     }
//     placesList.prepend(createCard(newCard))
//     closePopup(popupTypeNewCard)
//     newPlace.reset()
// }

// newPlace.addEventListener('submit', addNewCard)

// function likeCard(evt) {
//     evt.target.classList.toggle('card__like-button_is-active')
// }