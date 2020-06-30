import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { CircularProgress } from '@material-ui/core';

import { Loading, Container } from './styles';

export default function Monitoring() {
  const [loaded, setLoaded] = useState(true);
  const [jobs, setJobs] = useState([]);

  return (
    <>
      {loaded ? (
        <Container></Container>
      ) : (
        <Loading>
          <CircularProgress size="5rem" color="primary" />
        </Loading>
      )}
    </>
  );
}
