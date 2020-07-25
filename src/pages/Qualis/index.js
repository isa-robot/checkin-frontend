import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Loading, Container } from './styles';

export default function Qualis() {
  const loaded = useState(true);
  const { roles } = useSelector(state => state.user.profile);
  const history = useHistory();

  useEffect(() => {
    if (roles.includes('assisted')) history.push('/diario');
  }, [roles, history]);

  return (
    <>
      {loaded ? (
        <Container />
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
