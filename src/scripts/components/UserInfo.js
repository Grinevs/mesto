
export class UserInfo {
  constructor({userName, userAbout}) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
  }

  getUserInfo() {
    return { userName: this._userName.textContent, userAbout: this._userAbout.textContent}
  }

  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}