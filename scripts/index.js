import { FormValidator } from './FormValidator.js'

//Редактирование ПРОФИЛЯ
const profileRedactionPopupButton = document.querySelector('.profile__button-redaction');
const popupRedaction = document.querySelector('.popup_profile-redaction');
//const popupRedactionCloseButton = document.querySelector('.popup__close-redaction');
//находим форму в DOM, которую нужно будет отправлять
const formRedactionElement = popupRedaction.querySelector('.popup__form-redaction');

//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
//выбираем элементы, куда должны быть вставлены значения полей из попапа
const profileName = document.querySelector ('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

const config = {
    formSelector: '.popup__form',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputSelector: '.popup__input',
    ButtonSelector: '.popup__save'
}

//валидация формы редактирования
const redactionProfileValidator = new FormValidator(config, formRedactionElement);
redactionProfileValidator.enableValidation()

//открываем попап, добавляя к классу модификатор
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};
//закрываем попап, убирая модификатор
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

//находим открытый попап
const popups = document.querySelectorAll('.popup')

//добавляем к открытым попапам слушатели на нажатие мышкой по оверлэю и на крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

//функция закрытия попапа нажатием на Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape'){
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);  
    };
};

//функция открывает попап редактирования профиля после клика на кнопку редактирования,
//а также подставляет уже известные данные полей формы
function openPopupRedaction() {
    openPopup(popupRedaction);
    // подставляем данные из блока Profile в поля формы
    nameInput.value = profileName.textContent;
    vocationInput.value = profileVocation.textContent;
};
//клик по кнопке редактирования запускает функцию открытия попапа редактирования профиля
profileRedactionPopupButton.addEventListener('click',openPopupRedaction);

//функция закрытия окна редактирования после нажатия на крестик в форме редактирования профиля
function closePopupRedaction() {
   closePopup(popupRedaction);
};

//описываем функцию-обработчик отправки формы, в которой:
// изменяются данные полей формы редактирования и они сохраняются на странице профиля;
//вызывается функция закрытия после нажатия на кнопку "Сохранить"
function  handleSubmitProfileForm(evt) {
    evt.preventDefault(); //эта строчка отменяет стандартную отправку формы, позже определим свою логику отправки
    
    //вставляем новые значения из попапа в поля блока profile
    profileName.textContent = nameInput.value;
    profileVocation.textContent = vocationInput.value;
    // закрываем попап после нажатия кнопки "сохранить"
    closePopupRedaction();
};

//прикрепляем обработчик к форме редактирования profile, который будет следить за событием submit - отправка
formRedactionElement.addEventListener('submit', handleSubmitProfileForm);

//Добавление КАРТОЧЕК
const cardAddPopupButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_profile-add');
//const popupAddCloseButton = document.querySelector('.popup__close-add');

const formAddElement = popupAdd.querySelector('.popup__form-add');

//валидация формы добавления карточек
const addCardValidator = new FormValidator(config, formAddElement);
addCardValidator.enableValidation()

const cardsContainer = document.querySelector('.cards__container');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//открытие карточек на переднем плане
const popupReview = document.querySelector('.popup_card-review');
//const popupReviewCloseButton = document.querySelector('.popup__close-card');

const popupFigure = document.querySelector('.popup__figure');
const popupCard = document.querySelector('.popup__card');
const popupFigcaption = popupFigure.querySelector('.popup__figcaption');

//кладем в переменную содержание (.content) тега template
const template = document.querySelector('.template__item').content;

//функция вставляет карточку в начало массива initalCards
function renderCard(card) {
    cardsContainer.prepend(createItem(card));
};

initalCards.forEach(renderCard);

//функция клонирует внутренний код тега template с содержимым 
//и создает новые карточки подставляя значения из массива initalCards
function createItem(card) {
    const newCard = template.cloneNode(true);
    const newImage = newCard.querySelector('.cards__image');
    //
    newCard.querySelector('.cards__title').textContent = card.name;
    newImage.src = card.link;
    newImage.alt = card.name;
    //добавляем слушатели на каждой карточке, которые проверяют срабатывание  
    //какого-то события (удаление, лайка, открытия карточки)
    newCard.querySelector('.cards__button-delete').addEventListener('click', function(event) {
        event.target.closest('.cards__item').remove();
    });
    newCard.querySelector('.cards__button-like').addEventListener('click', function(event) {
        event.target.classList.toggle('cards__button-like_active');
    });
    newImage.addEventListener('click', function () {
        openPopupCardReview(card)
    });
    return newCard;
};

// функция открытия окна просмотра картинки после нажатия на конкретную картинку
function openPopupCardReview(data){
    openPopup(popupReview);
    popupCard.src = data.link;
    popupCard.alt = data.name;
    popupFigcaption.textContent = data.name;
}

//функция открытия окна добавления карточек после клика на плюс
function openPopupCardAdd() {
    openPopup(popupAdd);
};

//клик по кнопке добавления карточек запускает функцию открытия окна добавления карточек
cardAddPopupButton.addEventListener('click', openPopupCardAdd);

//функция закрытия окна добавления картинок после нажатия на крестик
function closePopupCardAdd() {
    closePopup(popupAdd);
};

//функция добавления карточки через попап добавления "+"
function addCard(e) {
    e.preventDefault();
    renderCard({name: titleInput.value, link: linkInput.value});
    formAddElement.reset();
    // закрываем попап после нажатия кнопке "Добавить"
    closePopupCardAdd(); 
};

//прикрепляем обработчик к форме добавления новой карточки
formAddElement.addEventListener('submit', addCard);