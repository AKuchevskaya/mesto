const profileOpenPopupButton = document.querySelector('.profile__button-redaction');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__save');
const popupContainer = document.querySelector('.popup__container');
//находим форму в DOM, которую нужно будет отправлять
const formElement = document.querySelector('.popup__form')
//выбираем поля формы, которые надо заполнитьв попапе
const nameInput = document.querySelector('.popup__input_type_name');
const vocationInput = document.querySelector('.popup__input_type_vocation');
//выбираем элементы, куда должны быть вставлены значения полей из попапа
const profileName = document.querySelector ('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');


//открываем попап по клику на кнопку редактирования, добавляя к классу модификатор
function openPopup() {
    popup.classList.add('popup_opened')
    //в открывшеийся попап вставляем в поля формы значения из блока profile с помощью textContent
    nameInput.value = profileName.textContent;
    vocationInput.value = profileVocation.textContent;
}
profileOpenPopupButton.addEventListener('click', openPopup);

//закрываем попап по клику на крестик, убирая модификатор
function closePopup() {
    popup.classList.remove('popup_opened')
}
popupCloseButton.addEventListener('click', closePopup);

//закрываем попап по клику вне формы (когда можно и не нажимать на крестик)
//работает в случае сброса стандартного поведения (defaultPrevented)
popup.addEventListener('click', function(event) {
    if(!event.defaultPrevented) {
        closePopup ();
    }
})
popupContainer.addEventListener('click', function(e) {
    e.stopPropagation()
})

//описываем функцию-обработчик отправки формы, в которой:
// открывается попап(пока она никуда не отправляется)
function  formSubmitHandler(evt) {
    evt.preventDefault(); //эта строчка отменяет стандартную отправку формы, позже определим свою логику отправки

    //вставляем новые значения из попапа в поля блока profile
    profileName.textContent = nameInput.value;
    profileVocation.textContent = vocationInput.value;

    // закрываем попап после нажатия кнопки "сохранить"
    popupSaveButton.addEventListener('click', closePopup);
}

//прикрепляем обработчик к форме, который будет следить за событием submit - отправка
formElement.addEventListener('submit', formSubmitHandler);
