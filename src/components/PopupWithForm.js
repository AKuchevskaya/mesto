import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._button = this._popup.querySelector('.popup__save')
    }
    _getInputValues(){
        const inputs = [...this._form.querySelectorAll('.popup__input')]
        const values = {}

        inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }
    renderLoadingSave(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Сохранение...'
        } else {
            this._button.textContent = 'Сохранить'
        }
    }

    renderLoadingCreate(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Создание...'
        } else {
            this._button.textContent = 'Создать'
        }
    }

    changeSubmitHandler(newchangeSubmitHandler) {
        this._handleSubmit = newchangeSubmitHandler
    }

    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
            this._handleSubmit(this._getInputValues())
        })
    }
    close() {
        super.close()
        this._form.reset()
    }
}