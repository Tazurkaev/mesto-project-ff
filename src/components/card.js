import { deleteCardOnServer, addCardLike, unlikeCard } from "./api"

export function createCard(card, openImagePopup, userId) {
    const cardTemplate = document.querySelector('#card-template').content
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = placesItem.querySelector('.card__image')
    const cardTitle = placesItem.querySelector('.card__title')
    const cardDeleteButton = placesItem.querySelector('.card__delete-button')
    const cardLikeButton = placesItem.querySelector('.card__like-button')
    const likeCounter = placesItem.querySelector('.card__like-counter')


    cardLikeButton.addEventListener('click', (event) =>  likeCard(event, card._id, likeCounter))
    likeCounter.textContent = card.likes.length


    cardImage.addEventListener('click', () => {
        openImagePopup(card.link, card.name)
    })    

    
    cardDeleteButton.addEventListener('click', () => {
        deleteCard(placesItem, card._id)
    })

    cardImage.src = card.link 
    cardTitle.textContent = card.name

    if(card.owner._id === userId) {
        cardDeleteButton.classList.remove('card__delete-button-hidden')
    } else {
        cardDeleteButton.classList.add('card__delete-button-hidden')
    }

    if(card.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    return placesItem

 }


export function deleteCard(card, cardId) {
    deleteCardOnServer(cardId)
        .then(() => {
            card.remove();
        })
        .catch((err) => {
            console.error(`Ошибка при удалении карточки: ${err}`);
            alert('Произошла ошибка при удалении карточки. Пожалуйста, попробуйте снова.');
        });
}

export function likeCard(event, cardId, likeCounter) {
    const likeButton = event.target

    if(likeButton.classList.contains('card__like-button_is-active')) {
        unlikeCard(cardId)
        .then((likeData) => {
            likeButton.classList.remove('card__like-button_is-active')
            likeCounter.textContent = likeData.likes.length
        })
        .catch((err) => {
            console.error(`Ошибка при удалении лайка: ${err}`);
            alert('Произошла ошибка при удалении лайка. Пожалуйста, попробуйте снова.');
        });
    }else { 
        addCardLike(cardId)
        .then((likeData) => {
            likeButton.classList.add('card__like-button_is-active')
            likeCounter.textContent = likeData.likes.length
        })
        .catch((err) => {
            console.error(`Ошибка при добавлении лайка: ${err}`);
            alert('Произошла ошибка при добавлении лайка. Пожалуйста, попробуйте снова.');
        });
    }
}