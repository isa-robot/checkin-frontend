import React from 'react';

import { useKeycloak } from '@react-keycloak/web';
import AppRoutes from './app.routes';

export default function Routes() {
  const [, initialized] = useKeycloak();

  if (!initialized) return <h1>Loading...</h1>;

  return <AppRoutes />;
}
