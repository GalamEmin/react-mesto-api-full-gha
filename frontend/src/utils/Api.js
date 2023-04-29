class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateUserInfo(object) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: object.name,
        about: object.about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard(object) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: object.name,
        link: object.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  putLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editAvatar(object) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: object.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://api.galam.nomoredomains.monster"
});

export default api;
