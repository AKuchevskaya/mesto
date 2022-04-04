export class UserInfo {
    constructor({ profileNameSelector, profileVocationSelector }) {
        this._nameElement = document.querySelector(profileNameSelector)
        this._vocationElement = document.querySelector(profileVocationSelector)
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            vocation: this._vocationElement.textContent
        }
    }
    setUserInfo(title, vocation) {
        this._nameElement.textContent = title
        this._vocationElement.textContent = vocation
    }
}
