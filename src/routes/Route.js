import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  resource,
  ...rest
}) {
  const { signed } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.user);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/diario" />;
  }

  if (resource) {
    const { resources: userResources } = profile.role;

    let redirect = false;

    userResources.map(res => {
      if (res.name === resource) {
        redirect = true;
      }
    });

    if (!redirect) {
      return <Redirect to="/qualis" />;
    }
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isAdmin: PropTypes.bool,
  resource: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isAdmin: false,
  resource: false,
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
