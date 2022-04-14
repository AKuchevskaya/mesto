export class FormValidator {
    constructor(config, form) {
        this._form = form
        this._config = config
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.ButtonSelector);
    }

    //функция убирает ошибку в случае валидности формы
    _setInputValid(input, errorMessage) {
        errorMessage.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
    };
    
    //функция выдает ошибку в случае невалидности формы
    _setInputInvalid(input, errorMessage) {
        errorMessage.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    };
      
    //функция делает кнопку неактивной в случае невалидности формы
    _enableButton() {
        this._button.removeAttribute('disabled');
        this._button.classList.remove(this._config.inactiveButtonClass);
    };
     
    //функция делает кнопку неактивной, если валидация не пройдена
    _disableButton() {
        this._button.setAttribute('disabled', '');
        this._button.classList.add(this._config.inactiveButtonClass);
    };
    
    //функция проверяет валидность введенных данных и выдает ошибку в случае невалидных данных  
    _checkImputValidity(input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        if (input.validity.valid) {
            this._setInputValid(input, errorMessage);
        } else {
            this._setInputInvalid(input, errorMessage);
        }
    };
    
    //функция применяет к кнопке отправки стили в случае валидности формы
    _checkButtonValidity() {
        if (this._form.checkValidity()) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    };
    
    //функция собирает все инпуты в массив, включает их валидацию, и валидацию кнопки
    _setEventListenerInputs() {
    
        this._checkButtonValidity();
        this._form.addEventListener('reset', () => {
            this._disableButton();
        });
      
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkImputValidity(input);
                this._checkButtonValidity();
            });
        });
    };
    resetErrors() {
        this._inputs.forEach((input) =>{
            input._setInputValid(input, errorMessage)
        })
    }
    //функция собирает все формы в массив и определяет в какой именно форме заполняются поля
    enableValidation() {
        this._setEventListenerInputs();
    };
}