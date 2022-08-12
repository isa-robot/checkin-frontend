import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NoAccessModal from '~/components/NoAccessModal';
import BaseLineModal from '~/components/BaseLineModal';
import ResponsibleModal from '~/components/ResponsibleModal';
import StudentBaselineModal from '~/components/StudentBaselineModal'

import { Wrapper, Layer } from './styles';

export default function DefaultLayout({ children }) {
  const [toggleNoAccess, setToggleNoAccess] = useState(false);

  const [toggleBaseline, setToggleBaseline] = useState(false);
  const [toggleStudentBaseline, setToggleStudentBaseline] = useState(false)
  const [toggleResponsible, setToggleResponsible] = useState(false);

  const { baseline, roles, resources, responsible } = useSelector(
    state => state.user.profile
  );

  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!loading) {
      if (roles.length === 0) {
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
  }, [roles, resources, baseline, loading, responsible]);

  function toggleBaselineModal(prop) {
    setToggleBaseline(prop);
  }
  function toggleResponsibleModal(prop) {
    setToggleResponsible(prop);
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
        <NoAccessModal toggle={toggleNoAccess}/>
        { !roles.includes('student') ? (
            <BaseLineModal
              toggle={toggleBaseline}
              toggleFunction={toggleBaselineModal}
            />
          ):
            <StudentBaselineModal
              toggle={toggleStudentBaseline}
              toggleFunction={toggleStudentBaselineModal}
            />
        }
          <ResponsibleModal
            toggle={toggleResponsible}
            toggleFunction={toggleResponsibleModal}
          />
      </Layer>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
