import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import { Divider } from '@material-ui/core';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import {
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  InputGroup,
  GreenButton,
  Logo,
  LogoSecondary,
  Card,
  LinkDiv
} from './styles';

import api from '~/services/api';

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  function handleOnSubmit(data) {
    setLoading(true);
    api
      .post('users/tokens/forgot', data)
      .then(() => {
        toast.success('Email de recuperação de senha enviado');
        history.push('/');
      })
      .catch(error => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
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
            <p>Digite seu email para trocar a senha</p>
            <InputGroup>
              <MdEmail
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1rem"
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.email && errors.email.type === 'required' && (
              <span>O Email é obrigatório</span>
            )}
            {errors.email && errors.email.type === undefined && (
              <span>{errors.email.message}</span>
            )}
          </CardBody>
          <CardFooter>
            <GreenButton
              type="submit"
              backgroundColor="mountainMeadow"
              color="white"
            >
              {loading ? 'Carregando...' : 'Recuperar'}
            </GreenButton>
            <LinkDiv>
              <Link to="/">VOLTAR</Link>
            </LinkDiv>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
