import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { username, password } = payload;

    const response = yield call(api.post, '/sessions', {
      username,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (user.establishments.length > 0) {
      api.defaults.headers.establishment = user.establishments[0].id;
    }

    yield put(signInSuccess(token, user));
  } catch (error) {
    console.log(error);
    toast.error('Username ou senha inválidos');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  const { profile } = payload.user;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  if (profile && profile.establishments.length > 0) {
    api.defaults.headers.establishment = profile.establishments[0].id;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
