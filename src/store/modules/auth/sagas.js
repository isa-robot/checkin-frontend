import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { UpdateStore, cleanStore } from './actions';

import { keycloak } from '~/keycloak';

export function kcSignIn() {
  keycloak.login();
}

function getBaseline(id) {
  return api
    .get(`/users/baselines/${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function getUser(id) {
  return api.get(`/users/user/${id}`);
}

export function* kcAuth() {
  api.defaults.headers.Authorization = `Bearer ${keycloak.token}`;

  /*
    A call da api precisaria retornar o establishment!
  */
  const id = keycloak.tokenParsed.sub;

  const user_response = yield call(getUser, id);

  const baseline_response = yield call(getBaseline, id);

  console.log(baseline_response)

  if (baseline_response.response)
    user_response.data.user.baseline = baseline_response.response.data.baseline;
  else {
    user_response.data.user.baseline = null;
  }

  const {
    username,
    enabled,
    emailVerified,
    baseline,
  } = user_response.data.user;
  const { roles } = user_response.data;

  const user = {};
  user.profile = { id, username, enabled, emailVerified, roles, baseline };

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
