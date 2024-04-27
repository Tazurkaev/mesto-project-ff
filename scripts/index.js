const cardTemplate = document.querySelector('#card-template').content
const cardContainer = document.querySelector('.places__list')

function creationCard(card,deleteCard) {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
    cardTemplateClone.querySelector('.card__image').src = card.link;
    cardTemplateClone.querySelector('.card__title').textContent = card.name;
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', function() {
        deleteCard(cardTemplateClone)
    })

    return cardTemplateClone
}

function deleteCard(card){
card.remove()
}

for(let i = 0; i < initialCards.length; i++){
    const addCard = creationCard(initialCards[i], deleteCard)
    cardContainer.prepend(addCard)
}