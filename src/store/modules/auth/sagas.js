import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { UpdateStore, cleanStore } from './actions';

import { keycloak } from '~/keycloak';

export function kcSignIn() {
  keycloak.login();
}

export function* kcAuth() {
  api.defaults.headers.Authorization = `Bearer ${keycloak.token}`;

  /*
    A call da api precisaria retornar o establishment!
  */

  const id = keycloak.tokenParsed.sub;

  const response = yield call(api.get, `/users/user/${id}`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  const { username, enabled, emailVerified } = response.data.user;
  const { roles } = response.data;

  const user = {};
  user.profile = { id, username, enabled, emailVerified, roles };

  yield put(UpdateStore(user));
}

export function* kcSignOut() {
  keycloak
    .logout()
    .then(yield put(cleanStore()))
    .catch(console.log('error'));
}

export function setToken({ payload }) {
  if (!payload) return;

  // const { profile } = payload.user;

  if (keycloak && keycloak.authenticated) {
    api.defaults.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  // if (profile && profile.establishments?.length > 0) {
  //   api.defaults.headers.establishment = profile.establishments[0].id;
  // }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/KC_SIGN_IN_REQUEST', kcSignIn),
  takeLatest('@auth/KC_SIGN_OUT', kcSignOut),
  takeLatest('@auth/KC_ON_AUTH', kcAuth),
]);
