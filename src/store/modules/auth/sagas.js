import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { UpdateStore, cleanStore } from './actions';

import { keycloak } from '~/keycloak';

export function* kcSignIn() {
  yield call(keycloak.login());
}

function getBaseline(id) {
  return api
    .get(`/users/baselines/${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

// function getUser(id) {
//   return api.get(`/users/user/${id}`);
// }

export function* kcAuth() {
  api.defaults.headers.Authorization = `Bearer ${keycloak.token}`;

  const id = keycloak.tokenParsed.sub;

  const username = keycloak.tokenParsed.preferred_username;
  const { emailVerified, name } = keycloak.tokenParsed;

  const roles = keycloak.tokenParsed.realm_access
    ? keycloak.tokenParsed.realm_access.roles.filter(
        role => !['offline_access', 'uma_authorization'].includes(role)
      )
    : [];

  const resources = keycloak.tokenParsed.resource_access
    ? keycloak.tokenParsed.resource_access['isa-frontend']
      ? keycloak.tokenParsed.resource_access['isa-frontend'].roles
      : []
    : [];

  let baseline = null;
  if (resources.includes('diary')) {
    const baseline_response = yield call(getBaseline, id);
    if (baseline_response.response)
      baseline = baseline_response.response.data.baseline;
  }

  const user = {};
  user.profile = { roles, resources, username, emailVerified, baseline, name };

  yield put(UpdateStore(user));
}

export function* kcSignOut() {
  yield call(keycloak.logout());
  yield put(cleanStore());
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
