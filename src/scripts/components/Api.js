export class Api {
  constructor(config)  {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch( this._url+'/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      return this._checkRequest(res)
     });
  }

  getUserProfile() {
    return fetch( this._url+'/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      return this._checkRequest(res)
     });
  }

  editUserProfile(data) {
    return fetch( this._url+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
      return this._checkRequest(res)
     });
    }

  addNewCard(data) {
    return fetch( this._url+'/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      return this._checkRequest(res)
     });
  }

  deleteCard(cardId) {
    return fetch( this._url+'/cards/'+cardId, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._checkRequest(res)
     });
} 

  addLike(cardId) {
    return fetch( this._url+'/cards/likes/'+cardId, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._checkRequest(res)
     });
  } 

  removeLike(cardId) {
    return fetch( this._url+'/cards/likes/'+cardId, {
      method: 'DELETE',
      headers: this._headers
    })
     .then(res => {
      return this._checkRequest(res)
     });
  } 

  editUserAvatar(data) {
    return fetch( this._url+'/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
       return this._checkRequest(res)
      });
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

}

