import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useKeycloak } from '@react-keycloak/web';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NoAccessModal from '~/components/NoAccessModal';
import BaseLineModal from '~/components/BaseLineModal';

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggleNoAccess, setToggleNoAccess] = useState(false);
  const [toggleBaseline, setToggleBaseline] = useState(false);
  const [keycloak] = useKeycloak();

  const { profile } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.auth);
  // const { roles } = useSelector(state => state.user.profile);
  const baseline  = profile ? profile.baseline : null;
  console.log(profile)

  const roles = keycloak.realmAccess ? keycloak.realmAccess.roles : [];

  useEffect(() => {
    if (!loading) {
      if (roles.length === 0) setToggleNoAccess(true);
      else if (baseline === null) setToggleBaseline(true);
    }
  }, [roles, profile, baseline]);

  function toggleBaselineModal(prop) {
    setToggleBaseline(prop);
  }

  return (
    <Wrapper>
      <Layer>
        <Header />
        {children}
        <Footer />
        <NoAccessModal toggle={toggleNoAccess} />
        <BaseLineModal
          toggle={toggleBaseline}
          toggleFunction={toggleBaselineModal}
        />
      </Layer>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
