
//функция убирает ошибку в случае валидности формы
function setInputValid(input, errorMessage, inputErrorClass) {
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
};

//функция выдает ошибку в случае невалидности формы
function setInputInvalid(input, errorMessage, inputErrorClass) {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
};
  
//функция делает кнопку неактивной в случае невалидности формы
function enableButton(button, inactiveButtonClass) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
};
 
//функция делает кнопку неактивной, если валидация не пройдена
function disableButton(button, inactiveButtonClass) {
    button.setAttribute('disabled', '');
    button.classList.add(inactiveButtonClass);
};

//функция проверяет валидность введенных данных и выдает ошибку в случае невалидных данных  
function checkImputValidity(form, input, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      setInputValid(input, errorMessage, inputErrorClass);
    } else {
      setInputInvalid(input, errorMessage, inputErrorClass);
    }
};

//функция применяет к кнопке отправки стили в случае валидности формы
function checkButtonValidity(form, button, inactiveButtonClass) {
    if (form.checkValidity()) {
      enableButton(button, inactiveButtonClass);
    } else {
      disableButton(button, inactiveButtonClass);
    }
};
  
//функция собирает все инпуты в массив, включает их валидацию, и валидацию кнопки
function setEventListenerInputs(form, { inputSelector, ButtonSelector, inputErrorClass, inactiveButtonClass }) {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(ButtonSelector);
  
    checkButtonValidity(form, button, inactiveButtonClass);
    form.addEventListener('reset', () => {
      disableButton(button, inactiveButtonClass);
    });
  
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkImputValidity(form, input, inputErrorClass);
        checkButtonValidity(form, button, inactiveButtonClass);
      });
    });
};
 
//функция собирает все формы в массив и определяет в какой именно форме заполняются поля
function enableValidation({ formSelector, ...rest }) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
      setEventListenerInputs(form, rest);
    });
};
  
const config = {
    formSelector: '.popup__form',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputSelector: '.popup__input',
    ButtonSelector: '.popup__save'
}
  
enableValidation(config);