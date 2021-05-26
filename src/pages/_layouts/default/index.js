import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NoAccessModal from '~/components/NoAccessModal';
import NoAccessTermModal from '~/components/NoAccessTermModal';
import BaseLineModal from '~/components/BaseLineModal';
import StudentBaselineModal from '~/components/StudentBaselineModal'

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggleNoAccess, setToggleNoAccess] = useState(false);
  const [toggleBaseline, setToggleBaseline] = useState(false);
  const [toggleStudentBaseline, setToggleStudentBaseline] = useState(false)
  const { baseline, roles, resources, termsAccepted } = useSelector(
    state => state.user.profile
  );
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!loading) {
      if (termsAccepted == undefined){
        setToggleNoAccess(true);
      }else if (roles.length === 0) {
        setToggleNoAccess(true);
      } else {
        setToggleNoAccess(false);
        if(roles.includes('student') && !baseline) {
          setToggleStudentBaseline(true)
        }else if (resources.includes('diary') && !baseline) {
          setToggleBaseline(true);
        }
      }
    }
  }, [roles, resources, baseline, loading]);

  function toggleBaselineModal(prop) {
    setToggleBaseline(prop);
  }
  function toggleStudentBaselineModal(prop) {
    setToggleStudentBaseline(prop);
  }

  return (
    <Wrapper>
      <Layer>
        <Header />
        {children}
        <Footer />
        { !roles.includes('student') ? (
        <NoAccessModal toggle={toggleNoAccess} />

        ) : ( <NoAccessTermModal toggle={toggleNoAccess} /> )}
        { !roles.includes('student') ? (
            <BaseLineModal
              toggle={toggleBaseline}
              toggleFunction={toggleBaselineModal}
            />
          ):
            <StudentBaselineModal
              toggle={toggleStudentBaseline}
              toggleFunction={toggleStudentBaselineModal}
            />}
      </Layer>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
