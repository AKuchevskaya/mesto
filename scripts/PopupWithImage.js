import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open(name, link){
        super.open()

        const image = this._popup.querySelector('.popup__card')
        const figcaption = this._popup.querySelector('.popup__figcaption')

        figcaption.textContent = name
        image.src = link
    }
}
