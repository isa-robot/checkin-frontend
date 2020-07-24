import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { keycloak } from '~/keycloak';

import {
  newBaselineSuccess,
  newBaselineFailure,
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
  takeLatest('@user/UPDATE_USER_REQUEST', updateUser),
]);
