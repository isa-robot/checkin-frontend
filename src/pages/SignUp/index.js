import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  MdPerson,
  MdLock,
  MdVpnKey,
  MdPermIdentity,
  MdEmail,
  MdSmartphone,
} from 'react-icons/md';
import { FaIdCard } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { Divider } from '@material-ui/core';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import MaskedInput from 'react-text-mask';

import {
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  InputGroup,
  GreenButton,
  Logo,
  LogoSecundary,
  Card,
} from './styles';

import api from '~/services/api';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const schema = yup.object().shape({
    establishment: yup.string().required(),
    roleId: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
    name: yup.string().required(),
    cpf: yup.string().required(),
    email: yup
      .string()
      .email('O Email precisa ser válido')
      .required(),
    phone: yup.string().required(),
  });

  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: schema,
  });

  function handleOnSubmit(data) {
    setLoading(true);
    api
      .post('users', data)
      .then(() => {
        toast.success('Usuário cadastrado com sucesso!');
        history.push('/');
      })
      .catch(error => {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach(function(entry) {
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
              <LogoSecundary>
                <p>Infection</p> <p>Surveillance</p> <p>Assistant</p>
              </LogoSecundary>
            </Logo>
            <Divider />
            <span>
              Digite seus dados para se registrar. As chaves devem ser
              fornecidas pela sua instituição.
            </span>
          </CardHeader>
          <CardBody>
            <InputGroup>
              <MdVpnKey
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="establishment"
                placeholder="Chave da Instituição"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.establishment &&
              errors.establishment.type === 'required' && (
                <span>A Chave é obrigatória</span>
              )}
            <InputGroup>
              <MdVpnKey
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="roleId"
                placeholder="Chave de Usuário"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.roleId && errors.roleId.type === 'required' && (
              <span>A Chave é obrigatória</span>
            )}
            <InputGroup>
              <MdPerson
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1.3rem"
              />
              <input
                name="username"
                placeholder="Digite seu usuário"
                autoComplete="chrome-off"
                autofill="off"
                ref={register()}
              />
            </InputGroup>
            {errors.username && errors.username.type === 'required' && (
              <span>O Usuário é obrigatório</span>
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
            <InputGroup>
              <MdPermIdentity
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="name"
                placeholder="Nome completo"
                autoComplete="off"
                ref={register()}
              />
            </InputGroup>
            {errors.name && errors.name.type === 'required' && (
              <span>O Nome é obrigatório</span>
            )}
            <InputGroup>
              <FaIdCard
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <Controller
                as={
                  <MaskedInput
                    mask={[
                      /[0-9]/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                  />
                }
                control={control}
                name="cpf"
                placeholder="CPF"
                autoComplete="off"
              />
            </InputGroup>
            {errors.cpf && errors.cpf.type === 'required' && (
              <span>O CPF é obrigatório</span>
            )}
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
            <InputGroup>
              <MdSmartphone
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1rem"
              />
              <Controller
                as={
                  <MaskedInput
                    mask={[
                      '(',
                      /[0-9]/,
                      /\d/,
                      ')',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                }
                control={control}
                name="phone"
                placeholder="Celular"
                autoComplete="off"
              />
            </InputGroup>
            {errors.phone && errors.phone.type === 'required' && (
              <span>O Celular é obrigatório</span>
            )}
          </CardBody>
          <CardFooter>
            <GreenButton
              type="submit"
              backgroundColor="mountainMeadow"
              color="white"
            >
              {loading ? 'Carregando...' : 'Registre-se'}
            </GreenButton>
            <Link to="/">Voltar</Link>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
