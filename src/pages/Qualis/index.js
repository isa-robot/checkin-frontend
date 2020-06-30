import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { Loading, Container } from './styles';

export default function Qualis() {
  const loaded = useState(true);

  return (
    <>
      {loaded ? (
        <Container></Container>
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
