import axios from 'axios';
import CONSTANTS from '../../constants';

class AuthApi {
  #_client;
  #_accessToken;

  constructor (client) {
    this.#_client = client;
    this.#_accessToken = null;
    this._url = 'auth/';

    this.#_client.interceptors.request.use(this.interceptRequestSuccess, err =>
      Promise.reject(err)
    );
    this.#_client.interceptors.response.use(
      this.interceptResponseSuccess,
      this.interceptResponseError
    );
  }

  login = data => {
    return this.#_client.post(`${this._url}sign-in`, data);
  };

  signUp = data => {
    return this.#_client.post(`${this._url}sign-up`, data);
  };

  refresh = refreshToken => {
    return this.#_client.post(`${this._url}refresh`, { refreshToken });
  };

  logout = () => {
    this.#_accessToken = null;
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
  };

  interceptRequestSuccess = config => {
    if (this.#_accessToken) {
      config.headers['Authorization'] = `Bearer ${this.#_accessToken}`;
    }
    return config;
  };

  _saveTokenPair ({ refresh, access }) {
    this.#_accessToken = access;
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
  }

  interceptResponseSuccess = response => {
    const {
      config: { url },
    } = response;

    if (url.includes(this._url)) {
      const {
        data: {
          data: { tokenPair },
        },
      } = response;
      this._saveTokenPair(tokenPair);
    }
    return response;
  };

  interceptResponseError = async err => {
    const { response, config } = err;

    const token = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (response.status === 401) {
      this.logout();
    }

    if (response.status === 419 && token) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await this.refresh(token);
      this._saveTokenPair(tokenPair);
      config.headers['Authorization'] = `Bearer ${this.#_accessToken}`;

      return this.#_client(config);
    }
    return Promise.reject(err);
  };
}

export default AuthApi;
