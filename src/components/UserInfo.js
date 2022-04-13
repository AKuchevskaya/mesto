export class UserInfo {
    constructor({ profileNameSelector, profileVocationSelector, profileAvatarSelector }) {
        this._nameElement = document.querySelector(profileNameSelector)
        this._vocationElement = document.querySelector(profileVocationSelector)
        this._avatar = document.querySelector(profileAvatarSelector)
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            vocation: this._vocationElement.textContent,
            link: this._avatar.src
        }
    }
    setUserInfo(name, vocation, link) {
        this._nameElement.textContent = name
        this._vocationElement.textContent = vocation
        this._avatar.src = link
    }
}
