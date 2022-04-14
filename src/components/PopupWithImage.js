import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector('.popup__card')
        this._figcaption = this._popup.querySelector('.popup__figcaption')

    }
    open(name, link){
        super.open()

        this._figcaption.textContent = name
        this._image.src = link
        this._image.alt = this._figcaption.textContent
    }
}
