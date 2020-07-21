import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';

import { useSelector } from 'react-redux';
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  resource,
  roles,
  ...rest
}) {
  const [keycloak] = useKeycloak();

  const isAuthorized = roles => {
    if (keycloak && roles) {
      return (
        roles.some(r => {
          const realm = keycloak.hasRealmRole(r);
          return realm;
        }) || roles.length === 0
      );
    }
    return false;
  };

  const resources = keycloak.realmAcces
    ? keycloak.resourceAccess
      ? keycloak.resourceAccess['isa-frontend'].roles
      : []
    : [];
  const hasResource = resource ? resources.includes(resource) : true;

  if (!hasResource) return <Redirect to="/qualis" />;

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
  isPrivate: PropTypes.bool,
  isAdmin: PropTypes.bool,
  resource: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  roles: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isAdmin: false,
  resource: false,
  roles: [],
};

// let admin;

// if (store.getState().user.profile !== null) {
//   admin = store.getState().user.profile.user.admin;
// } else {
//   admin = 'N';
// }

// if (admin !== 'Y' && isAdmin) {
//   return <Redirect to="/eleicao" />;
// }
