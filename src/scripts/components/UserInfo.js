
export class UserInfo {
  constructor({userName, userAbout, avatar}) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return { userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      avatar: this._avatar.src}
  }

  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  
  }

  setUserAvatar(src) {
    this._avatar.src = src;
  }
}