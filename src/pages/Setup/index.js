import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useKeycloak } from '@react-keycloak/web';
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
  ChoiceGroup,
} from './styles';

import api from '~/services/api';

export default function Setup() {
  const [loaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [provider, setProvider] = useState('');
  const [smsChanel, setSmsChanel] = useState('whatsapp');
  const [keycloak] = useKeycloak();

  const gmailSchema = yup.object().shape({
    user: yup.string().required(),
    pass: yup.string().required(),
    host: yup.string().required(),
    port: yup.string().required(),
    address: yup.string().required(),
    name: yup.string().required(),
    // subject: yup.string().required(),
  });

  const amazonSchema = yup.object().shape({
    accessKeyId: yup.string().required(),
    secretAccessKey: yup.string().required(),
    name: yup.string().required(),
    region: yup.string().required(),
    // subject: yup.string().required(),
  });

  const smsSchema = yup.object().shape({
    zenviaSecretKey: yup.string().required(),
    from: yup.string().required(),
  });

  const gmailForm = useForm({
    validationSchema: gmailSchema,
    // defaultValues: {
    //     username: profile.username,
    //     name: profile.name,
    //     cpf: profile.cpf,
    //     phone: profile.phone,
    //     email: profile.email,
    //   },
  });

  const amazonForm = useForm({
    validationSchema: amazonSchema,
    // defaultValues: {
    //     username: profile.username,
    //     name: profile.name,
    //     cpf: profile.cpf,
    //     phone: profile.phone,
    //     email: profile.email,
    //   },
  });

  const smsForm = useForm({
    validationSchema: smsSchema,
    // defaultValues: {
    //     username: profile.username,
    //     name: profile.name,
    //     cpf: profile.cpf,
    //     phone: profile.phone,
    //     email: profile.email,
    //   },
  });

  useEffect(() => {
    async function fetchMailer() {
      const response = await api.get('mails', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });

      if (response.data) {
        if (response.data.type === 'ethereal') {
          const { address, host, pass, user, port, name } = response.data;
          setProvider('gmail');
          gmailForm.setValue('address', address);
          gmailForm.setValue('host', host);
          gmailForm.setValue('pass', pass);
          gmailForm.setValue('user', user);
          gmailForm.setValue('port', port);
          gmailForm.setValue('name', name);
        } else if (response.data.type === 'ses') {
          setProvider('amazon');
          const { accessKeyId, secretAccessKey, region, name } = response.data;
          amazonForm.setValue('accessKeyId', accessKeyId);
          amazonForm.setValue('secretAccessKey', secretAccessKey);
          amazonForm.setValue('region', region);
          amazonForm.setValue('name', name);
        }
      } else {
        setProvider('gmail');
      }
    }

    fetchMailer();
  }, []);

  function handleOnSubmitSms(data) {
    data.chanel = smsChanel;

    api
      .post('/sms/createSms', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('SMS configurado com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao configurar SMS!');
      });
  }

  function handleChangeProvider(evt) {
    const { value } = evt.target;

    setProvider(value);

    if (value === 'amazon') {
      gmailForm.setValue('address', '');
      gmailForm.setValue('name', '');
      gmailForm.setValue('host', '');
      gmailForm.setValue('port', '');
    } else if (value === 'gmail') {
      amazonForm.setValue('accessKeyId', '');
      amazonForm.setValue('secretAccessKey', '');
      amazonForm.setValue('region', '');
      amazonForm.setValue('name', '');
    }
  }

  function handleOnSubmitGmail(data) {
    data.type = 'ethereal';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao configurar email!');
      });
  }

  function handleOnSubmitAmazon(data) {
    data.type = 'ses';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao configurar email!');
      });
  }

  function handleChangeSmsChanel(evt) {
    const { value } = evt.target;
    setSmsChanel(value);
  }

  return (
    <>
      {loaded ? (
        <Container>
          <Scroll>
            {provider === 'gmail' ? (
              <form
                onSubmit={gmailForm.handleSubmit(handleOnSubmitGmail)}
                autoComplete="off"
              >
                <Card>
                  <CardHeader title="Configuração de E-mail" />
                  <CardContent>
                    <ChoiceGroup>
                      <div>
                        <input
                          type="radio"
                          id="provider-gmail"
                          name="provider"
                          value="gmail"
                          onChange={handleChangeProvider}
                          checked={provider === 'gmail'}
                        />
                        <label htmlFor="provider-gmail">Gmail</label>
                        <input
                          type="radio"
                          id="provider-amazon"
                          name="provider"
                          value="amazon"
                          onChange={handleChangeProvider}
                          checked={provider === 'amazon'}
                        />
                        <label htmlFor="provider-amazon">Amazon</label>
                      </div>
                    </ChoiceGroup>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="name"
                            placeholder="Nome"
                            autoComplete="off"
                            ref={gmailForm.register()}
                          />
                          <label>Nome</label>
                        </InputGroup>
                        {gmailForm.errors.name &&
                          gmailForm.errors.name.type === 'required' && (
                            <span>O nome é obrigatória</span>
                          )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="address"
                            placeholder="Endereço"
                            autoComplete="off"
                            ref={gmailForm.register()}
                          />
                          <label>Endereço</label>
                        </InputGroup>
                        {gmailForm.errors.user &&
                          gmailForm.errors.user.type === 'required' && (
                            <span>O endereço é obrigatório</span>
                          )}
                      </div>
                    </InputsGroup>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="host"
                            placeholder="Endereço do Servidor"
                            autoComplete="off"
                            ref={gmailForm.register()}
                          />
                          <label>Endereço do Servidor</label>
                        </InputGroup>
                        {gmailForm.errors.host &&
                          gmailForm.errors.host.type === 'required' && (
                            <span>O endereço do servidor é obrigatório</span>
                          )}
                        {gmailForm.errors.host &&
                          gmailForm.errors.host.type === undefined && (
                            <span>{gmailForm.errors.host.message}</span>
                          )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="port"
                            type="number"
                            placeholder="Porta"
                            autoComplete="off"
                            ref={gmailForm.register()}
                          />
                          <label>Porta</label>
                        </InputGroup>
                        {gmailForm.errors.port &&
                          gmailForm.errors.port.type === 'required' && (
                            <span>A porta é obrigatória</span>
                          )}
                        {gmailForm.errors.port &&
                          gmailForm.errors.port.type === undefined && (
                            <span>{gmailForm.errors.port.message}</span>
                          )}
                      </div>
                    </InputsGroup>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="user"
                            placeholder="Digite seu usuário"
                            autoComplete="chrome-off"
                            autofill="off"
                            ref={gmailForm.register()}
                          />
                          <label>Usuário</label>
                        </InputGroup>
                        {gmailForm.errors.user &&
                          gmailForm.errors.user.type === 'required' && (
                            <span>O Usuário é obrigatório</span>
                          )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="pass"
                            type="password"
                            placeholder="Sua senha"
                            autoComplete="off"
                            ref={gmailForm.register()}
                          />
                          <label>Senha</label>
                        </InputGroup>
                        {gmailForm.errors.pass &&
                          gmailForm.errors.pass.type === 'required' && (
                            <span>A Senha é obrigatória</span>
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
            ) : (
              <form
                onSubmit={amazonForm.handleSubmit(handleOnSubmitAmazon)}
                autoComplete="off"
              >
                <Card>
                  <CardHeader title="Configuração de E-mail" />
                  <CardContent>
                    <ChoiceGroup>
                      <div>
                        <input
                          type="radio"
                          id="provider-gmail"
                          name="provider"
                          value="gmail"
                          onChange={handleChangeProvider}
                          defaultChecked
                        />
                        <label htmlFor="provider-gmail">Gmail</label>
                        <input
                          type="radio"
                          id="provider-amazon"
                          name="provider"
                          value="amazon"
                          onChange={handleChangeProvider}
                        />
                        <label htmlFor="provider-amazon">Amazon</label>
                      </div>
                    </ChoiceGroup>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="name"
                            placeholder="Nome"
                            autoComplete="off"
                            ref={amazonForm.register()}
                          />
                          <label>Nome</label>
                        </InputGroup>
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="region"
                            placeholder="Região"
                            autoComplete="off"
                            ref={amazonForm.register()}
                          />
                          <label>Região</label>
                        </InputGroup>
                        {amazonForm.errors.region &&
                          amazonForm.errors.region.type === 'required' && (
                            <span>Região é obrigatório</span>
                          )}
                      </div>
                    </InputsGroup>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="accessKeyId"
                            placeholder="Chave de acesso"
                            autoComplete="off"
                            ref={amazonForm.register()}
                          />
                          <label>Chave de acesso</label>
                        </InputGroup>
                        {amazonForm.errors.accessKeyId &&
                          amazonForm.errors.accessKeyId.type === 'required' && (
                            <span>A Chave é obrigatória!</span>
                          )}
                        {amazonForm.errors.accessKeyId &&
                          amazonForm.errors.accessKeyId.type === undefined && (
                            <span>{amazonForm.errors.accessKeyId.message}</span>
                          )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="secretAccessKey"
                            placeholder="Chave de acesso secreta"
                            autoComplete="off"
                            ref={amazonForm.register()}
                          />
                          <label>Chave de acesso secreta</label>
                        </InputGroup>
                        {amazonForm.errors.secretAccessKey &&
                          amazonForm.errors.secretAccessKey.type ===
                            'required' && (
                            <span>A Chave secreta é obrigatória!</span>
                          )}
                        {amazonForm.errors.secretAccessKey &&
                          amazonForm.errors.secretAccessKey.type ===
                            undefined && (
                            <span>
                              {amazonForm.errors.secretAccessKey.message}
                            </span>
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
            )}

            <form
              onSubmit={smsForm.handleSubmit(handleOnSubmitSms)}
              autoComplete="off"
            >
              <Card>
                <CardHeader title="Configuração de SMS" />
                <CardContent>
                  <ChoiceGroup>
                    <div>
                      <input
                        type="radio"
                        id="chanel-whatsapp"
                        name="smsChanel"
                        value="whatsapp"
                        onChange={handleChangeSmsChanel}
                        defaultChecked
                      />
                      <label htmlFor="chanel-whatsapp">Whatsapp</label>
                      <input
                        type="radio"
                        id="chanel-sms"
                        name="smsChanel"
                        value="sms"
                        onChange={handleChangeSmsChanel}
                      />
                      <label htmlFor="chanel-sms">SMS</label>
                    </div>
                  </ChoiceGroup>
                  <InputsGroup>
                    <div>
                      <InputGroup>
                        <input
                          name="zenviaSecretKey"
                          placeholder="Chave"
                          autoComplete="off"
                          ref={smsForm.register()}
                        />
                        <label>Chave</label>
                      </InputGroup>
                      {smsForm.errors.zenviaSecretKey &&
                        smsForm.errors.zenviaSecretKey.type === 'required' && (
                          <span>A chave é obrigatória</span>
                        )}
                    </div>
                    <div>
                      <InputGroup>
                        <input
                          name="from"
                          placeholder="Remetente"
                          autoComplete="off"
                          ref={smsForm.register()}
                        />
                        <label>Remetente</label>
                      </InputGroup>
                      {smsForm.errors.from &&
                        smsForm.errors.from.type === 'required' && (
                          <span>Esse campo é obrigatório</span>
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
