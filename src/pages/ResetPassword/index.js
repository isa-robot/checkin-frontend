import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MdLock } from 'react-icons/md';
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
} from './styles';

import api from '~/services/api';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const schema = yup.object().shape({
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  function handleOnSubmit(data) {
    const { password, confirm_password } = data;
    setLoading(true);
    api
      .post('users/tokens/reset', {
        confirm_password,
        password,
        token: location.search.replace('?token=', ''),
      })
      .then(() => {
        toast.success('Senha atualizada com sucesso');
        history.push('/');
      })
      .catch(error => {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach(function (entry) {
            toast.error(entry);
          });
        } else {
          toast.error(error.response.data.message);
        }
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
            <p>Digite sua nova senha.</p>
            <InputGroup>
              <MdLock
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="password"
                type="password"
                placeholder="Nova senha"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.password && errors.password.type === 'required' && (
              <span>A Senha é obrigatória</span>
            )}
            <InputGroup>
              <MdLock
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirme sua senha"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.confirm_password &&
              errors.confirm_password.type === 'required' && (
                <span>A Senha é obrigatória</span>
              )}
            {errors.confirm_password &&
              errors.confirm_password.type === 'oneOf' && (
                <span>{errors.confirm_password.message}</span>
              )}
          </CardBody>
          <CardFooter>
            <GreenButton
              type="submit"
              backgroundColor="mountainMeadow"
              color="white"
            >
              {loading ? 'Carregando...' : 'Alterar a senha'}
            </GreenButton>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
