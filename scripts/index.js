//ПЕРЕМЕННЫЕ
//Общие

const popupContainer = document.querySelector('.popup__container');



//Редактирование ПРОФИЛЯ
const profileRedactionPopupButton = document.querySelector('.profile__button-redaction');
const popupRedaction = document.querySelector('.popup_profile-redaction');
const popupRedactionCloseButton = document.querySelector('.popup_close-redaction');
//находим форму в DOM, которую нужно будет отправлять
const formRedactionElement = document.querySelector('.popup_form-redattion');
//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
//выбираем элементы, куда должны быть вставлены значения полей из попапа
const profileName = document.querySelector ('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupSaveInfoButton = document.querySelector('.popup_save-text');

formRedactionElement.addEventListener('click', function(e) {
    e.stopPropagation();
});
//открываем попап, добавляя к классу модификатор
function openPopup(popup) {
    popup.classList.add('popup_opened');
};
//закрываем попап, убирая модификатор
function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

//функция закрытия окна редактирования после нажатия на крестик в форме редактирования профиля
function closePopupRedaction() {
    closePopup(popupRedaction);
};

//клик по кнопке закрытия вызывает функцию закрытия окна редактирования
popupRedactionCloseButton.addEventListener('click', closePopupRedaction);


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
//закрываем попап по клику вне формы (когда можно и не нажимать на крестик) 
//работает в случае сброса стандартного поведения (defaultPrevented) 
popupRedaction.addEventListener('click', function(event) {
    if(!event.defaultPrevented) {
        closePopupRedaction(); 
        
    };
});
//прикрепляем обработчик к форме редактирования profile, который будет следить за событием submit - отправка
formRedactionElement.addEventListener('submit', formSubmitHandler);



//Добавление КАРТОЧЕК
const cardAddPopupButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_profile-add');
const popupAddCloseButton = document.querySelector('.popup_close-add');
const formAddElement = document.querySelector('.popup_form-add');
const cardsContainer = document.querySelector('.cards__container');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
//открытие карточек на переднем плане
const popupReview = document.querySelector('.popup_card-review');
const popupReviewCloseButton = document.querySelector('.popup_close-card');
const popupFigure = document.querySelector('.popup__figure');
const popupCard = popupFigure.querySelector('.popup_card');
const popupFigcaption = popupFigure.querySelector('.popup_figcaption');

const initalCards = [
    {
        name: 'Карачаевск',
        link: './images/karachaevsk.jpg'
    },
    {
        name: 'Гора Эльбрус',
        link: './images/elbrus.jpg'
    },
    {
        name: 'Домбай',
        link: './images/dombay.jpg'
    },
    {
        name: 'Романцевские горы',
        link: './images/romancevskie_gory.jpg'
    },
    {
        name: 'Непал',
        link: './images/nepal.jpg'
    },
    {
        name: 'Гималаи',
        link: './images/himalayas.jpg'
    },
];
//кладем в переменную содержание (.content) тега template
const template = document.querySelector('.template__item').content;

//функция отображает карточки из массива initalCards
function renderCards(card) {
    cardsContainer.prepend(createItem(card));
};
initalCards.forEach(renderCards);


//функция клонирует внутренний код тега template с содержимым 
//и создает новые карточки подставляя значения из массива initalCards
function createItem(card,data) {
    const newCard = template.cloneNode(true);
    //
    newCard.querySelector('.cards__title').textContent = card.name;
    newCard.querySelector('.cards__image').src = card.link;
    newCard.querySelector('.cards__image').alt = card.name;
    //вызвали функцию, которая проверяет на каждой карточке срабатывание какого-то события (удаление, лайка, открытия карточки)
    //addListeners(newCard);
    newCard.querySelector('.cards__button-delete').addEventListener('click', function(event) {
        event.target.closest('.cards__item').remove();
    });
    newCard.querySelector('.cards__button-like').addEventListener('click', function(event) {
        event.target.classList.toggle('cards__button-like_active');
    });
    newCard.querySelector('.cards__image').addEventListener('click', function () {
        openPopupCardReview(data)
    });
    return newCard;
};
function openPopupCardReview(data){
    openPopup(popupReview);
    popupCard.src = data.link;
    popupCard.alt = data.name;
    popupFigcaption.textContent = data.name;
}

//функция открытия окна добавления карточек после клика на плюс
function openPopupCardAdd() {
    openPopup(popupAdd);
    titleInput.value = "";
    linkInput.value = "";
};

//клик по кнопке добавления карточек запускает функцию открытия окна добавления карточек
cardAddPopupButton.addEventListener('click', openPopupCardAdd);

//функция закрытия окна добавления картинок после нажатия на крестик
function closePopupCardAdd() {
    closePopup(popupAdd);
};

//клик по кнопке закрытия вызывает функцию закрытия окна добавления картинок
popupAddCloseButton.addEventListener('click', closePopupCardAdd);

formAddElement.addEventListener('click', function(e) {
    e.stopPropagation();
});
function addCard(e) {
    e.preventDefault();
    renderCards({name: titleInput.value, link: linkInput.value});
    // закрываем попап после нажатия кнопке "Добавить"
    closePopupCardAdd();
};

popupAdd.addEventListener('click', function(event) {
    if(!event.defaultPrevented) {
        closePopupCardAdd();
        event.stopPropagation() 
    };
});

//прикрепляем обработчик к форме добавления новой карточки
formAddElement.addEventListener('submit', addCard);

//функция, которая будет добавлять обработчики
//function addListeners(el, card) {
    //клик по кнопке удаления вызывает функцию удаления картинки
    //el.querySelector('.cards__button-delete').addEventListener('click', handleDelete);
    //клик по кнопке лайка вызывает функцию смены стилей иконки
   // el.querySelector('.cards__button-like').addEventListener('click', function (event) {
   //     event.classList.toggle('cards__button-like_active');
   // });
    //клик по самой картинке вызывает функцию открытия попапа с этой картинкой на переднем плане
   // el.querySelector('.cards__image').addEventListener('click', () => handleOpenCard(card));
//}
//функция удаления картинки по нажатию на корзину
//function handleDelete(event) {
    //методом closest находим ближайший элемент, на котором сработал клик и удаляем этот элемент
    //event.target.closest('.cards__item').remove();
//};









//функция закрытия окна просмотра картинки после нажатия на крестик
function closePopupCardReview() {
    closePopup(popupReview);
};

popupReview.addEventListener('click', function(event) {
    if(!event.defaultPrevented) {
        closePopupCardReview();
        event.stopPropagation() 
    };
});
//клик по кнопке закрытия вызывает функцию закрытия окна просмотра картинки
popupReviewCloseButton.addEventListener('click', closePopupCardReview);