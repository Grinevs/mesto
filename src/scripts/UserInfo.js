
export class UserInfo {
  constructor({userName, userAbout}) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
  }

  getUserInfo() {
    return { userName: this._userName, userAbout: this._userAbout}
  }

  setUserInfo(userName, userAbout) {
    this._userName.textContent = userName ;
    this._userAbout.textContent = userAbout;
  }
}