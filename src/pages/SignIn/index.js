import React from 'react';
import { useDispatch } from 'react-redux';
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
    <Container>
      <span>By Qualis</span>
      <Card>
        <CardHeader>
          <Logo>
            <p>ISA</p>
            <LogoSecondary>
              <p>Infection</p> <p>Surveillance</p> <p>Assistant</p>
            </LogoSecondary>
          </Logo>
          <Divider />
        </CardHeader>
        <CardFooter>
          {keycloak && !keycloak.authenticated && (
            <GreenButton
              type="button"
              backgroundColor="mountainMeadow"
              color="white"
            >
              KC Login
            </GreenButton>
          )}
        </CardFooter>
      </Card>
    </Container>
  );
}
