import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/web';

import { Loading } from './styles';
import { kcSignInRequest, kcOnAuth } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [keycloak, initialized] = useKeycloak();

  if (initialized) {
    if (keycloak.authenticated) {
      dispatch(kcOnAuth());
      history.push('/qualis');
    } else {
      dispatch(kcSignInRequest());
    }
  }

  return (
    <Loading>
      <CircularProgress size="5rem" />
    </Loading>
  );
}
