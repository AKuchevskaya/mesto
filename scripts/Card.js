export class Card {
    constructor(card, templateSelector, openPopupCardReview) {
        this._name = card.name
        this._link = card.link
        this._templateSelector = templateSelector
        this._openPopupCardReview = openPopupCardReview

    }
    _getTemplate() {
        const newCard = document
        .querySelector(this._templateSelector)
        .content
        .cloneNode(true);

        return newCard
    }
    _setEventListeners(){
        //добавляем слушатели на каждой карточке, которые проверяют срабатывание  
        //какого-то события (удаление, лайка, открытия карточки)
        this._newCard.querySelector('.cards__button-delete').addEventListener('click', (event) => {
            event.target.closest('.cards__item').remove();
        });
        this._newCard.querySelector('.cards__button-like').addEventListener('click', (event) => {
            event.target.classList.toggle('cards__button-like_active');
        });
        this._newImage.addEventListener('click', () => {
            this._openPopupCardReview(this._name, this._link)
        });
    }
    //функция клонирует внутренний код тега template с содержимым 
    //и создает новые карточки подставляя значения из массива initalCards
    createItem() {
        this._newCard = this._getTemplate()
        this._newImage = this._newCard.querySelector('.cards__image');
    
        this._newCard.querySelector('.cards__title').textContent = this._name;
        this._newImage.src = this._link;
        this._newImage.alt = this._name;
        
        this._setEventListeners()
        return this._newCard;
    }
}