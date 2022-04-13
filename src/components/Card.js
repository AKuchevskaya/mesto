export class Card {
    constructor(card, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._id = card.id;
        this._userId = card.userId;
        this._ownerId = card.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick= handleLikeClick;

    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard
    }

    _getTemplate() {
        const newCard = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.cards__item')
        .cloneNode(true);

        return newCard
    }

    _removeLike() {
        this._newCard.querySelector('.cards__button-like').classList.remove('cards__button-like_active');
    }

    deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    setLikes(newLikes) {
        this._likes = newLikes
        const likeCountElement = this._newCard.querySelector('.cards__span')
        likeCountElement.textContent = this._likes.length

        if (this.isLiked()) {
            this._fillLike()
        } else {
            this._removeLike()

        }
    }

    _fillLike() {
        this._newCard.querySelector('.cards__button-like').classList.add('cards__button-like_active');
    }

    _setEventListeners(){

        //добавляем слушатели на каждой карточке, которые проверяют срабатывание  
        //какого-то события (удаление, лайка, открытия карточки)
        this._newCard.querySelector('.cards__button-like').addEventListener('click', () => {this._handleLikeClick(this._id)});
        this._newCard.querySelector('.cards__button-delete').addEventListener('click', () => {this._handleDeleteClick(this._id)});
        this._newImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
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
        this.setLikes(this._likes)
        this._setEventListeners()

        if (this._ownerId !== this._userId) {
            this._newCard.querySelector('.cards__button-delete').style.display = 'none'
        }
        

        return this._newCard;
    }
}