import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import history from '../browserHistory';
import * as Api from '../api/http';
import { controller } from '../api/ws/socketController';

function createAuthSaga (method) {
  return function * (action) {
    try {
      const {
        data: {
          data: { user },
        },
      } = yield method(action.data);
      controller.subscribe(user.id);
      history.replace('/');
      yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    } catch (err) {
      yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
    }
  };
}

export function * refreshSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield Api.auth.refresh(action.data);
    controller.subscribe(user.id);
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    yield action.redirect();
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
    yield action.redirect('/login');
  }
}

export function * logoutSaga (action) {
  yield Api.auth.logout();
  yield put({ type: ACTION.CLEAR_STORE });
}

export const loginSaga = createAuthSaga(Api.auth.login);
export const registerSaga = createAuthSaga(Api.auth.signUp);
