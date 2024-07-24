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

// Функция проверки валидности поля
function isValid(inputElement) {
    const validity = inputElement.validity;
    const isNameField = inputElement.name === "name" || inputElement.name === "place-name";
    const isDescriptionField = inputElement.name === "description";

    if (isNameField && !validationConfig.namePattern.test(inputElement.value)) {
        inputElement.setCustomValidity(inputElement.dataset.error);
    } else if (isDescriptionField && !validationConfig.descriptionPattern.test(inputElement.value)) {
        inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
        inputElement.setCustomValidity("");
    }
    
    return inputElement.validity.valid;
}

// Функция показа сообщения об ошибке
function showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

// Функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
}

// Функция проверки валидности формы
function checkInputValidity(formElement, inputElement) {
    if (!isValid(inputElement)) {
        showInputError(formElement, inputElement);
    } else {
        hideInputError(formElement, inputElement);
    }
}

// Функция переключения состояния кнопки сабмита
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// Функция проверки наличия невалидных полей
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

// Функция установки слушателей событий на все поля формы
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

// Функция включения валидации всех форм
export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach(formElement => {
        setEventListeners(formElement);
    });
}

// Функция очистки ошибок валидации и деактивации кнопки
export function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
    });

    toggleButtonState(inputList, buttonElement);
}