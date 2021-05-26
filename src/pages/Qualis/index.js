import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Loading, Container } from './styles';
import { useKeycloak } from '@react-keycloak/web';


export default function Qualis() {
  const loaded = useState(true);
  const user  = useSelector(state => state.user);
  const [keycloak] = useKeycloak()
  const history = useHistory();

  useEffect(() => {
    if (keycloak.hasRealmRole('student')) {
        return history.push('/diario')
    }
    if(keycloak.hasRealmRole('assisted')){
      history.push('diario');
    }
  }, [user]);

  return (
    <>
      {loaded ? (
        <Container/>
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
