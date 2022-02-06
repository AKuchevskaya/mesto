//ПЕРЕМЕННЫЕ
//Общие

const popupContainer = document.querySelector('.popup__container');
//находим форму в DOM, которую нужно будет отправлять
const formElement = document.querySelector('.popup__form');

//Редактирование ПРОФИЛЯ
const profileRedactionPopupButton = document.querySelector('.profile__button-redaction');
const popupRedaction = document.querySelector('.popup_profile-redaction');
const popupRedactionCloseButton = document.querySelector('.popup_close-redaction');
//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
//выбираем элементы, куда должны быть вставлены значения полей из попапа
const profileName = document.querySelector ('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupSaveInfoButton = document.querySelector('.popup_save-text');


//Добавление КАРТОЧЕК
const cardAddPopupButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_profile-add');
const popupAddCloseButton = document.querySelector('.popup_close-add');
const popupSaveCardButton = document.querySelector('.popup_save-card');
const formAddElement = document.querySelector('.popup_form-add');
//кладем в переменную содержание (.content) тега template
const template = document.querySelector('.template__item').content;


const initalCards = [
    {
        name: 'Карачаевск',
        link: './images/Karachaevsk.jpg'
    },
    {
        name: 'Гора Эльбрус',
        link: './images/Elbrus.jpg'
    },
    {
        name: 'Домбай',
        link: './images/Dombay.jpg'
    },
    {
        name: 'Романцевские горы',
        link: './images/Romancevskie_gory.jpg'
    },
    {
        name: 'Непал',
        link: './images/Nepal.jpg'
    },
    {
        name: 'Гималаи',
        link: './images/Himalayas.jpg'
    },
];

const cardsContainer = document.querySelector('.cards__container');
const titleInput = document.querySelector('.popup__input_type_title');

 

//Открытие каждой карточки

//ФУНКЦИИ
//открываем попап, добавляя к классу модификатор
function openPopup(popup) {
    popup.classList.add('popup_opened');
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
profileRedactionPopupButton.addEventListener('click', openPopupRedaction);

//функция открытия окна добавления карточек после клика на плюс
function openPopupCardAdd() {
    openPopup(popupAdd);
};
//клик по кнопке добавления карточек запускает функцию открытия окна добавления карточек
cardAddPopupButton.addEventListener('click', openPopupCardAdd);

//закрываем попап, убирая модификатор
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//функция закрытия попапа редактирования после нажатия на крестик в форме редактирования профиля
function closePopupRedaction() {
    closePopup(popupRedaction);
};

//клик по кнопке закрытия вызывает функцию закрытия окна редактирования
popupRedactionCloseButton.addEventListener('click', closePopupRedaction);

function closePopupCardAdd() {
    closePopup(popupAdd);
}

popupAddCloseButton.addEventListener('click', closePopupCardAdd);

//описываем функцию-обработчик отправки формы, в которой:
// изменяются данные полей формы редактирования и они сохраняются на странице профиля;
//вызывается функция закрытия после нажатия на кнопку "Сохранить"
function  formSubmitHandler(evt) {
    evt.preventDefault(); //эта строчка отменяет стандартную отправку формы, позже определим свою логику отправки

    //вставляем новые значения из попапа в поля блока profile
    profileName.textContent = nameInput.value;
    profileVocation.textContent = vocationInput.value;
    // закрываем попап после нажатия кнопки "сохранить"
    closePopupRedaction();
};

//прикрепляем обработчик к форме, который будет следить за событием submit - отправка
formElement.addEventListener('submit', formSubmitHandler);

//функция отображает карточки из массива initalCards
function renderCards() {
    initalCards.forEach(renderItem);
};
//функция клонирует внутренний код тега template с содержимым 
function renderItem(card) {
    const newCard = template.cloneNode(true);
    //
    newCard.querySelector('.cards__title').innerText = card.name;
    newCard.querySelector('.cards__image').src = card.link;
    //newCard.querySelector('.cards__image').alt = name;
    //вызвали функцию, которая проверяет на каждой карточке срабатывание какого-то события (удаление, лайка, открытия карточки)
    addListeners(newCard);
    //добавляем каждый элемент в конец контейнера с карточками
    cardsContainer.appendChild(newCard);
};

function addCard(e) {
    renderItem(titleInput.value);
};

//прикрепляем обработчик к форме
formAddElement.addEventListener('click', addCard);

//функция, которая будет добавлять обработчики
function addListeners(el) {
    //клик по кнопке удаления вызывает функцию удаления картинки
    el.querySelector('.cards__button-delete').addEventListener('click', handleDelete);
    //клик по кнопке лайка вызывает функцию смены стилей иконки
    //el.querySelector('.cards__button-like').addEventListener('click', handleReaction);
    //клик по самой картинке вызывает функцию открытия попапа с этой картинкой на переднем плане
    el.querySelector('.cards__image').addEventListener('click', handleOpenCard);
}

//функция меняет цвет заливки кнопки с белого на черный
//function handleReaction(event) {
//    event.target.closest('.cards__item').
//}
//функция удаления картинки по нажатию на корзину
function handleDelete(event) {
    //debagger;
    //методом closest находим ближайший элемент, на котором сработал клик и удаляем этот элемент
    event.target.closest('.cards__item').remove();
};
renderCards();
//функция открытия картинки переднем плане 
function handleOpenCard(event) {
    const openedCard = event.target.closest('.cards__item').querySelector('.cards__image');

}


//СЛУШАТЕЛИ




