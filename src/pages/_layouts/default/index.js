import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Modal from '~/components/BaseLineModal';

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggle, setToggle] = useState(false);

  const { baseline } = useSelector(state => state.user.profile);

  useEffect(() => {
    if (baseline === null) {
      setToggle(true);
    }
  }, [baseline]);

  function toggleModal(prop) {
    setToggle(prop);
  }

  return (
    <Wrapper>
      <Layer>
        <Header />
        {children}
        <Footer />
        <Modal toggle={toggle} toggleFunction={toggleModal} />
      </Layer>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
