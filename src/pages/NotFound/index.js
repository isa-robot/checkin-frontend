import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';

import { Container, Logo, LogoSecundary, Card } from './styles';
import BadRobot from '~/assets/images/icone-error.png';

export default function SignIn() {
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      history.push('/');
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <Container>
      <span>By Qualis</span>
      <Card>
        <Logo>
          <p>ISA</p>
          <LogoSecundary>
            <p>Infection</p> <p>Surveillance</p> <p>Assistant</p>
          </LogoSecundary>
        </Logo>
        <Divider />
        <div>
          <img src={BadRobot} alt="" />
        </div>
        <h1>Ops... Parece que essa página não existe</h1>
      </Card>
    </Container>
  );
}
