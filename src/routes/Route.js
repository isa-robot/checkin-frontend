import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  resource,
  roles,
  ...rest
}) {
  const [keycloak] = useKeycloak()

  const isAuthorized = routeRoles => {
    if (keycloak && routeRoles) {
      return (
        routeRoles.some(r => {
          const realm = keycloak.hasRealmRole(r);
          const realResource = keycloak.hasResourceRole(resource);
          return realm && (realResource || resource === false);
        }) || routeRoles.length === 0
      );
    }
    return false;
  };

  const Layout = keycloak.authenticated ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthorized(roles) ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        );
      }}
    />
  );
}

RouteWrapper.propTypes = {
  resource: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  roles: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  resource: false,
  roles: [],
};
