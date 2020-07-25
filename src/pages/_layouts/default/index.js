import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NoAccessModal from '~/components/NoAccessModal';
import BaseLineModal from '~/components/BaseLineModal';

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggleNoAccess, setToggleNoAccess] = useState(false);
  const [toggleBaseline, setToggleBaseline] = useState(false);

  const { baseline, roles, resources } = useSelector(
    state => state.user.profile
  );
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!loading) {
      if (roles.length === 0) setToggleNoAccess(true);
      else {
        setToggleNoAccess(false);
        if (resources.includes('diary') && baseline === null)
          setToggleBaseline(true);
      }
    }
  }, [roles, resources, baseline, loading]);

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
