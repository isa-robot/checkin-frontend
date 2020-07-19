import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

import { useKeycloak } from '@react-keycloak/web';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Modal from '~/components/NoAccessModal';

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggle, setToggle] = useState(false);
  const [keycloak] = useKeycloak();

  // const { profile } = useSelector(state => state.user);
  // const { roles } = useSelector(state => state.user.profile);
  // const baseline = null;
  // const baseline = true;

  const roles = keycloak.realmAccess ? keycloak.realmAccess.roles : [];

  useEffect(() => {
    if (roles.length === 0) setToggle(true);
  }, [roles]);

  return (
    <Wrapper>
      <Layer>
        <Header />
        {children}
        <Footer />
        <Modal toggle={toggle} />
      </Layer>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
