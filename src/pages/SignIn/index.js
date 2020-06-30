import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { MdPerson, MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { Divider } from '@material-ui/core';

import {
  Container,
  CardBody,
  CardFooter,
  CardHeader,
  InputGroup,
  GreenButton,
  Logo,
  LogoSecondary,
  Card,
  LinkDiv,
} from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);

  useEffect(() => {
    history.push('/');
  }, [history, signed]);

  function handleOnSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }

  return (
    <Container>
      <span>By Qualis</span>
      <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
        <Card>
          <CardHeader>
            <Logo>
              <p>ISA</p>
              <LogoSecondary>
                <p>Infection</p> <p>Surveillance</p> <p>Assistant</p>
              </LogoSecondary>
            </Logo>
            <Divider />
          </CardHeader>
          <CardBody>
            <p>Digite seus dados para fazer login.</p>
            <InputGroup>
              <MdPerson
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="username"
                type="text"
                placeholder="Digite seu usuário"
                autoComplete="chrome-off"
                autofill="off"
                ref={register({ required: true })}
              />
            </InputGroup>
            {errors.username && errors.username.type === 'required' && (
              <span>O usuário é obrigatório</span>
            )}
            <InputGroup>
              <MdLock
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="password"
                type="password"
                placeholder="Sua senha"
                autoComplete="off"
                ref={register({ required: true })}
              />
            </InputGroup>
            {errors.password && errors.password.type === 'required' && (
              <span>A senha é obrigatória</span>
            )}
          </CardBody>
          <CardFooter>
            <GreenButton
              type="submit"
              backgroundColor="mountainMeadow"
              color="white"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Acessar'}
            </GreenButton>
            <LinkDiv>
              <Link to="/registrar">REGISTRE-SE</Link>
              <Link to="/esqueci-minha-senha">ESQUECI MINHA SENHA</Link>
            </LinkDiv>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
