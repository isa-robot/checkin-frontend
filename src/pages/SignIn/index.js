import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/web';

import {
  Container,
  CardFooter,
  CardHeader,
  GreenButton,
  Logo,
  LogoSecondary,
  Card,
} from './styles';
import { kcSignInRequest, kcOnAuth } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (loading) history.push('/qualis');
  }, [loading, history]);

  const [keycloak, initialized] = useKeycloak();

  if (initialized) {
    if (keycloak.authenticated) {
      dispatch(kcOnAuth());
    } else {
      dispatch(kcSignInRequest());
    }
  }

  return <Container />;
}
