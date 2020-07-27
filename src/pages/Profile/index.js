import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import { updateUserRequest } from '~/store/modules/user/actions';
import {
  Loading,
  Container,
  Card,
  CardHeader,
  Scroll,
  InputGroup,
  Button,
  CardActions,
  CardContent,
  InputsGroup,
} from './styles';

export default function Profile() {
  const [loaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const schema = yup.object().shape({
  });

  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: schema,
  });

  function validateUpdate(data) {
    if (data.username !== profile.username) {
      return true;
    }

    if (data.name !== profile.name) {
      return true;
    }

    if (data.email !== profile.email) {
      return true;
    }

    if (data.phone !== profile.phone) {
      return true;
    }

    if (data.cpf !== profile.cpf) {
      return true;
    }

    return false;
  }

  function handleOnSubmit(data) {
    setLoading(true);
    if (validateUpdate(data)) {
      dispatch(updateUserRequest(data));
      setLoading(false);
    } else {
      toast.warn('Nenhum dado foi alterado para ser atualizado');
      setLoading(false);
    }
  }

  return (
    <>
      {loaded ? (
        <Container>
          <Scroll>
            <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
              <Card>
                <CardHeader title="Informações" />
                <CardContent>
                  <InputsGroup>
                    <div>
                      <InputGroup>
                        <input
                          name="name"
                          autoComplete="off"
                          placeholder="-"
                          ref={register()}
                        />
                        <label>Nome</label>
                      </InputGroup>
                      {errors.name && errors.name.type === 'required' && (
                        <span>O Nome é obrigatório</span>
                      )}
                    </div>
                    <div>
                      <InputGroup>
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
                          placeholder="-"
                          autoComplete="off"
                        />
                        <label>CPF</label>
                      </InputGroup>
                      {errors.cpf && errors.cpf.type === 'required' && (
                        <span>O CPF é obrigatório</span>
                      )}
                    </div>
                  </InputsGroup>
                  <InputsGroup>
                    <div>
                      <InputGroup>
                        <input
                          name="email"
                          autoComplete="off"
                          placeholder="-"
                          type="email"
                          ref={register()}
                        />
                        <label>E-mail</label>
                      </InputGroup>
                      {errors.email && errors.email.type === 'required' && (
                        <span>O E-mail é obrigatório</span>
                      )}
                      {errors.email && errors.email.type === undefined && (
                        <span>E-mail invalido</span>
                      )}
                    </div>
                    <div>
                      <InputGroup>
                        <input
                          name="username"
                          autoComplete="off"
                          placeholder="-"
                          ref={register()}
                        />
                        <label>Username</label>
                      </InputGroup>
                      {errors.username &&
                        errors.username.type === 'required' && (
                          <span>O Username é obrigatório</span>
                        )}
                    </div>
                  </InputsGroup>
                  <InputsGroup>
                    <div>
                      <InputGroup>
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
                          placeholder="-"
                          autoComplete="off"
                        />
                        <label>Celular</label>
                      </InputGroup>
                      {errors.phone && errors.phone.type === 'required' && (
                        <span>O Celular é obrigatório</span>
                      )}
                    </div>
                  </InputsGroup>
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    backgroundColor="mountainMeadow"
                    color="white"
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Atualizar'}
                  </Button>
                  <Button
                    type="button"
                    backgroundColor="sunset"
                    color="white"
                    disabled={loading}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    {loading ? 'Carregando...' : 'Voltar'}
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Scroll>
        </Container>
      ) : (
        <Loading>
          <CircularProgress size="5rem" color="primary" />
        </Loading>
      )}
    </>
  );
}
