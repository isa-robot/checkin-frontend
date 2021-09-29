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

function getResponsible() {
  return api
    .get(`/minor-responsible/by-user`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function getStudentBaseline(id) {
  return api
    .get(`/users/student-baselines/${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function getTerm() {
  return api
    .get(`/users/terms/by-user`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      }
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

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

  let baseline = undefined;
  let responsible = {};

  if (resources.includes('diary')) {
    if(roles.includes('student')) {
      const baseline_response = yield call(getStudentBaseline, id);
      if(baseline_response.response) {
        baseline = baseline_response.response.data.baseline;
        const responsible_response = yield call(getResponsible);
        if(responsible_response.response) {
          responsible = responsible_response.response.data;
        }
      }
    }else{
      const baseline_response = yield call(getBaseline, id);
      if (baseline_response.response){
        baseline = baseline_response.response.data.baseline;
      }
    }
  }

  let termsAccepted = undefined;
  if (roles.includes('student')){
    const term_response = yield call(getTerm);
    if (term_response.response){
      termsAccepted = term_response.response.data.canUseTheSystem;
    }
  }

  const user = {};
  user.profile = { responsible, roles, resources, username, emailVerified, baseline, name, termsAccepted };

  yield put(UpdateStore(user));
}

export function* updateUser(user) {

  yield put(UpdateStore(user));
}

export function* kcSignOut() {
  yield call(keycloak.logout());
  yield put(cleanStore());
}

export function setToken({ payload }) {
  if (!payload) return;

  if (keycloak && keycloak.authenticated) {
    api.defaults.headers.Authorization = `Bearer ${keycloak.token}`;
  }

}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/KC_SIGN_IN_REQUEST', kcSignIn),
  takeLatest('@auth/KC_SIGN_OUT', kcSignOut),
  takeLatest('@auth/KC_ON_AUTH', kcAuth),
  takeLatest('@auth/UPDATE_USER', updateUser),
]);
