import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { keycloak } from '~/keycloak';

import {
  newBaselineSuccess,
  newResponsibleBaselineSuccess,
  newStudentBaselineSuccess,
  newBaselineFailure,
  newResponsibleBaselineFailure,
  newStudentBaselineFailure,
  updateUserSuccess,
  updateUserFailure,
} from './actions';

function createBaseline(baseline) {
  return api
    .post(`/users/baselines/`, baseline, {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function createResponsibleBaseline(responsible) {
  console.log(responsible)
  return api
    .post(`/minor-responsible/by-user`, responsible, {
      headers: {Authorization: `Bearer ${keycloak.token}`},
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function createStudentBaselines(baseline) {
  console.log(keycloak.token);
  console.info("token", keycloak);
  return api
    .post(`/users/student-baselines/`, baseline, {
      headers: { Authorization: `Bearer `+keycloak.token },
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

export function* newBaseline({ payload }) {
  try {
    const baseline = payload.data;
    const { response } = yield call(createBaseline, baseline);

    toast.success('Perfil preenchido com sucesso!');

    yield put(newBaselineSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro, contate o suporte!');
    yield put(newBaselineFailure());
  }
}

export function* newResponsibleBaseline() {
  try {
    const { response } = yield call(createResponsibleBaseline);

    toast.success('Perfil preenchido com sucesso!');

    yield put(newResponsibleBaselineSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro, contate o suporte!');
    yield put(newResponsibleBaselineFailure());
  }
}

export function* newStudentBaseline({ payload }) {
  try {
    const baseline = payload.data;
    const { response } = yield call(createStudentBaselines, baseline);

    toast.success('Perfil preenchido com sucesso!');

    yield put(newStudentBaselineSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro, contate o suporte!');
    yield put(newStudentBaselineFailure());
  }
}

function updateUserApi(profile) {
  return api
    .put('/users', profile)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

export function* updateUser({ payload }) {
  const profile = payload.user;
  const { response, error } = yield call(updateUserApi, profile);

  if (response) {
    toast.success('Dados atualizados com sucesso');
    yield put(updateUserSuccess(response.data));
  } else {
    toast.error(error.response.data.message);
    yield put(updateUserFailure());
  }
}

export default all([
  takeLatest('@user/NEW_BASELINE_REQUEST', newBaseline),
  takeLatest('@user/NEW_STUDENT_BASELINE_REQUEST', newStudentBaseline),
  takeLatest('@user/UPDATE_USER_REQUEST', updateUser),
]);
