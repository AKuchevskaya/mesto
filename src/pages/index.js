import { Card } from '../components/Card.js'
import { initialCards } from '../components/cards.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import '../pages/index.css'


//Редактирование ПРОФИЛЯ
const profileRedactionPopupButton = document.querySelector('.profile__button-redaction');
const popupRedaction = document.querySelector('.popup_profile-redaction');
//находим форму в DOM, которую нужно будет отправлять
const formRedactionElement = popupRedaction.querySelector('.popup__form-redaction');

//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');

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

//функция открывает попап редактирования профиля после клика на кнопку редактирования,
//а также подставляет уже известные данные полей формы
function openPopupRedaction() {
    // подставляем данные из блока Profile в поля формы
    const data = userInfo.getUserInfo()
    nameInput.value = data.name;
    vocationInput.value = data.vocation;
    redactionProfilePopup.open();
};
//клик по кнопке редактирования запускает функцию открытия попапа редактирования профиля
profileRedactionPopupButton.addEventListener('click',openPopupRedaction);

//функция закрытия окна редактирования после нажатия на крестик в форме редактирования профиля
function closePopupRedaction() {
    redactionProfilePopup.close();
};

//описываем функцию-обработчик отправки формы, в которой:
// изменяются данные полей формы редактирования и они сохраняются на странице профиля;
//вызывается функция закрытия после нажатия на кнопку "Сохранить"
function  handleSubmitProfileForm(data) {
    const { name, vocation } = data
    userInfo.setUserInfo(name, vocation)

    // закрываем попап после нажатия кнопки "сохранить"
    closePopupRedaction();
};

//Добавление КАРТОЧЕК
const cardAddPopupButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_profile-add');
const formAddElement = popupAdd.querySelector('.popup__form-add');

//валидация формы добавления карточек
const addCardValidator = new FormValidator(config, formAddElement);
addCardValidator.enableValidation()

//const cardsContainer = document.querySelector('.cards__container');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

function createCard(data) {
    const newCard = new Card(data, '.template__item', () => {
        imagePopup.open(data.name, data.link)
    })
    return newCard.createItem()
}

function renderCard(data) {
    const card = createCard(data)
    section.addItem(card);
}

//функция открытия окна добавления карточек после клика на плюс
function openPopupCardAdd() {
    addCardPopup.open()
};

//клик по кнопке добавления карточек запускает функцию открытия окна добавления карточек
cardAddPopupButton.addEventListener('click', openPopupCardAdd);

//функция закрытия окна добавления картинок после нажатия на крестик
function closePopupCardAdd() {
    addCardPopup.close()
};

//функция добавления карточки через попап добавления "+"
function handleSubmitAddForm(data) {
    const card = createCard({
        name: data.text, 
        link: data.link
    })
    section.addItem(card)
    // закрываем попап после нажатия кнопке "Добавить"
    closePopupCardAdd(); 
};

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards__container')
const imagePopup = new PopupWithImage('.popup_card-review')
const addCardPopup = new PopupWithForm('.popup_profile-add', handleSubmitAddForm)
const redactionProfilePopup = new PopupWithForm('.popup_profile-redaction', handleSubmitProfileForm)

imagePopup.setEventListeners()
addCardPopup.setEventListeners()
redactionProfilePopup.setEventListeners()
section.renderItems()

const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileVocationSelector: '.profile__vocation' })