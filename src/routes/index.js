import React, { useEffect } from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { useSelector, useDispatch } from 'react-redux';
import AppRoutes from './app.routes';

import { kcOnAuth } from '~/store/modules/auth/actions';

export default function Routes() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);
  const [keycloak, initialized] = useKeycloak();

  useEffect(() => {
    if (!profile && initialized && keycloak.authenticated) {
      dispatch(kcOnAuth());
    }
  }, [profile, keycloak.authenticated, initialized]);

  if (!initialized || (!profile && keycloak.authenticated))
    return <h1>Loading...</h1>;

  return <AppRoutes />;
}
