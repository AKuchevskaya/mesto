import { Card } from '../components/Card.js'
import { initialCards } from '../utils/cards.js'
import { config } from '../utils/utils.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

import '../pages/index.css'
import { api } from '../components/Api.js'


let userId
Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
    api.getInitialCards(),
    api.getProfile()
])
.then(([cardList, data]) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar)
    userId = data._id

    cardList.forEach(data => {
        const card = createCard({
            name: data.name, 
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        })
    })
    section.renderItems(cardList)    
})
.catch((err) => {console.log(`Ошибка.....: ${err}`)})

//Редактирование ПРОФИЛЯ
const profileRedactionPopupButton = document.querySelector('.profile__button-redaction');
const popupRedaction = document.querySelector('.popup_profile-redaction');
const avatarRedactionButton = document.querySelector('.profile__button-avatar')
//находим форму в DOM, которую нужно будет отправлять
const formRedactionElement = popupRedaction.querySelector('.popup__form-redaction');
const formAddAvatar = document.querySelector('.popup__form-avatar')
//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
const avatarInput = document.querySelector('.popup__input_type_avatar');

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

//описываем функцию-обработчик отправки формы, в которой:
// изменяются данные полей формы редактирования и они сохраняются на странице профиля;
//вызывается функция закрытия после нажатия на кнопку "Сохранить"
function  handleSubmitProfileForm(data) {
    const { name, vocation } = data
    redactionProfilePopup.renderLoadingSave(true)
    api.editProfile(name, vocation)
    .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
        // закрываем попап после нажатия кнопки "создать"
        redactionProfilePopup.close()
    })
    .catch((err) => {console.log(`Ошибка.....: ${err}`)})
    .finally(() => {
        redactionProfilePopup.renderLoadingSave(false)
    })
};
function openPopupAvatar() {
    const data = userInfo.getUserInfo()
    
    avatarInput.value = data.link;
    avatarPopup.open()
}
avatarRedactionButton.addEventListener('click', openPopupAvatar)

function handleSubmitAddAvatar(data) {
    avatarPopup.renderLoadingSave(true)
    api.editAvatar(data.avatar)
    .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
        avatarPopup.close()
    })
    .catch((err) => {console.log(`Ошибка.....: ${err}`)})
    .finally(() => {
        avatarPopup.renderLoadingSave(false)
    })
}
const addAvatarValidator = new FormValidator(config, formAddAvatar);
addAvatarValidator.enableValidation()

//Добавление КАРТОЧЕК
const cardAddPopupButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_profile-add');
const formAddElement = popupAdd.querySelector('.popup__form-add');

//валидация формы добавления карточек
const addCardValidator = new FormValidator(config, formAddElement);
addCardValidator.enableValidation()

function createCard(data) {
    const newCard = new Card(
        data, 
        '.template__item', 
        () => {
            imagePopup.open(data.name, data.link)
        }, 
        (id) => {
            questionPopup.open()
            questionPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                .then(res => {
                    newCard.deleteCard()
                    questionPopup.close()
                })
                .catch((err) => {console.log(`Ошибка.....: ${err}`)})
            })
        },
        (id) => {
            if (newCard.isLiked()) {
                api.deleteLike(id)
                .then(res => {
                    newCard.setLikes(res.likes)
                })
                .catch((err) => {console.log(`Ошибка.....: ${err}`)})  
            } else {
                api.addLike(id)
                .then(res => {
                    newCard.setLikes(res.likes)
                })
                .catch((err) => {console.log(`Ошибка.....: ${err}`)})
            }
        })
    return newCard.createItem()
}

function renderCard(data) {
    const card = createCard({
        name: data.name, 
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
    })
section.addItem(card);
}

//клик по кнопке добавления карточек запускает функцию открытия окна добавления карточек
cardAddPopupButton.addEventListener('click', () => {
    addCardPopup.open()
});

//функция добавления карточки через попап добавления "+"
function handleSubmitAddForm(data) {
    addCardPopup.renderLoadingCreate(true)
    api.addCard(data.text, data.link)
    .then(res => {
        renderCard(res)
        // закрываем попап после нажатия кнопке "Добавить"
        addCardPopup.close()
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
        addCardPopup.renderLoadingCreate(false)
    })
};

const section = new Section({ renderer: renderCard }, '.cards__container')
const imagePopup = new PopupWithImage('.popup_card-review')
const addCardPopup = new PopupWithForm('.popup_profile-add', handleSubmitAddForm)
const redactionProfilePopup = new PopupWithForm('.popup_profile-redaction', handleSubmitProfileForm)
const questionPopup = new PopupWithForm('.popup_question')
const avatarPopup = new PopupWithForm('.popup_profile-avatar', handleSubmitAddAvatar)

imagePopup.setEventListeners()
addCardPopup.setEventListeners()
redactionProfilePopup.setEventListeners()
questionPopup.setEventListeners()
avatarPopup.setEventListeners()

const userInfo = new UserInfo({ 
    profileNameSelector: '.profile__name', 
    profileVocationSelector: '.profile__vocation', 
    profileAvatarSelector: '.profile__photo'
})