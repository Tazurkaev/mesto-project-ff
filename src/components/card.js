export function creationCard(card, deleteCard, openImagePopup) {
    console.log(deleteCard)
    const cardTemplate = document.querySelector('#card-template').content
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardTemplateClone.querySelector('.card__image')

    cardImage.addEventListener('click', function() {
        openImagePopup(card.link, card.name)
    })

    cardImage.src = card.link
    cardImage.alt = card.name

    cardTemplateClone.querySelector('.card__title').textContent = card.name;
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', function() {
       deleteCard(cardTemplateClone)
    })

    const cardLikeButton = cardTemplateClone.querySelector('.card__like-button')
    cardLikeButton.addEventListener('click', likeCard)

    return cardTemplateClone
}

export function deleteCard(card){
    card.remove()
}


function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

