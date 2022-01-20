const profileOpenPopupButton = document.querySelector('.profile__button-redaction');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
function openPopup() {
    popup.classList.add('popup_opened')
}
function closePopup() {
    popup.classList.remove('popup_opened')
}
profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);