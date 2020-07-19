import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdPerson, MdLock, MdVpnKey, MdEmail } from 'react-icons/md';
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
  LogoSecundary,
  Card,
  ChoiceGroup,
} from './styles';

import api from '~/services/api';
import { keycloak } from '~/keycloak';

/*
  NOVAS
*/

export default function EmailSetup() {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('gmail');
  const history = useHistory();

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
    // address: yup.string().required(),
    // subject: yup.string().required(),
  });

  const smsSchema = yup.object().shape({
    username: yup.string().required(),
    from: yup.string().required(),
  });

  const gmailForm = useForm({
    validationSchema: gmailSchema,
  });

  const amazonForm = useForm({
    validationSchema: amazonSchema,
  });

  const smsForm = useForm({
    validationSchema: smsSchema,
  });

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

  function handleChangeProvider(evt) {
    const { value } = evt.target;
    setProvider(value);
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <Logo>
            <LogoSecundary>
              <p>Configuração de E-mail</p>
            </LogoSecundary>
          </Logo>
          <Divider />
        </CardHeader>
        {provider === 'gmail' ? (
          <form
            onSubmit={gmailForm.handleSubmit(handleOnSubmitGmail)}
            autoComplete="off"
          >
            <CardBody>
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

              <p>Configuração do servidor SMTP</p>

              <InputGroup>
                <MdEmail
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1rem"
                />
                <input
                  name="host"
                  placeholder="Endereço do Servidor"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.errors.host &&
                gmailForm.errors.host.type === 'required' && (
                  <span>O endereço do servidor é obrigatório</span>
                )}
              {gmailForm.errors.host &&
                gmailForm.errors.host.type === undefined && (
                  <span>{gmailForm.errors.host.message}</span>
                )}
              <InputGroup>
                <MdEmail
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1rem"
                />
                <input
                  name="port"
                  type="number"
                  placeholder="Porta"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.errors.port &&
                gmailForm.errors.port.type === 'required' && (
                  <span>O endereço do servidor é obrigatório</span>
                )}
              {gmailForm.errors.port &&
                gmailForm.errors.port.type === undefined && (
                  <span>{gmailForm.errors.port.message}</span>
                )}
              <InputGroup>
                <MdPerson
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1.3rem"
                />
                <input
                  name="user"
                  placeholder="Digite seu usuário"
                  autoComplete="chrome-off"
                  autofill="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.errors.user &&
                gmailForm.errors.user.type === 'required' && (
                  <span>O Usuário é obrigatório</span>
                )}
              <InputGroup>
                <MdLock
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1em"
                />
                <input
                  name="pass"
                  type="password"
                  placeholder="Sua senha"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.errors.pass &&
                gmailForm.errors.pass.type === 'required' && (
                  <span>A Senha é obrigatória</span>
                )}

              <InputGroup>
                <MdEmail
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1rem"
                />
                <input
                  name="address"
                  placeholder="Endereço"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.address && gmailForm.address.type === 'required' && (
                <span>O endereço do servidor é obrigatório</span>
              )}
              {gmailForm.address && gmailForm.address.type === undefined && (
                <span>{gmailForm.address.message}</span>
              )}
              <InputGroup>
                <MdEmail
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1rem"
                />
                <input
                  name="name"
                  placeholder="Nome"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.name && gmailForm.name.type === 'required' && (
                <span>O endereço do servidor é obrigatório</span>
              )}
              {gmailForm.name && gmailForm.name.type === undefined && (
                <span>{gmailForm.name.message}</span>
              )}
              {/* <InputGroup>
                <MdEmail
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1rem"
                />
                <input
                  name="subject"
                  placeholder="Assunto"
                  autoComplete="off"
                  ref={gmailForm.register()}
                />
              </InputGroup>
              {gmailForm.errors.subject &&
                gmailForm.errors.subject.type === 'required' && (
                  <span>O endereço do servidor é obrigatório</span>
                )}
              {gmailForm.errors.subject &&
                gmailForm.errors.subject.type === undefined && (
                  <span>{gmailForm.errors.subject.message}</span>
                )} */}
            </CardBody>
            <CardFooter>
              <GreenButton
                type="submit"
                backgroundColor="mountainMeadow"
                color="white"
              >
                {loading ? 'Carregando...' : 'Salvar'}
              </GreenButton>
              <Link to="/qualis">Voltar</Link>
            </CardFooter>
          </form>
        ) : (
          <form
            onSubmit={amazonForm.handleSubmit(handleOnSubmitAmazon)}
            autoComplete="off"
          >
            <CardBody>
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

              <InputGroup>
                <MdVpnKey
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1em"
                />
                <input
                  name="accessKeyId"
                  placeholder="Chave de acesso"
                  autoComplete="off"
                  ref={amazonForm.register()}
                />
              </InputGroup>
              {amazonForm.errors.accessKeyId &&
                amazonForm.errors.accessKeyId.type === 'required' && (
                  <span>O endereço do servidor é obrigatório</span>
                )}
              {amazonForm.errors.accessKeyId &&
                amazonForm.errors.accessKeyId.type === undefined && (
                  <span>{amazonForm.errors.accessKeyId.message}</span>
                )}
              <InputGroup>
                <MdVpnKey
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1em"
                />
                <input
                  name="secretAccessKey"
                  placeholder="Chave de acesso secreta"
                  autoComplete="off"
                  ref={amazonForm.register()}
                />
              </InputGroup>
              {amazonForm.errors.secretAccessKey &&
                amazonForm.errors.secretAccessKey.type === 'required' && (
                  <span>O endereço do servidor é obrigatório</span>
                )}
              {amazonForm.errors.secretAccessKey &&
                amazonForm.errors.secretAccessKey.type === undefined && (
                  <span>{amazonForm.errors.secretAccessKey.message}</span>
                )}

              <InputGroup>
                <MdVpnKey
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1em"
                />
                <input
                  name="region"
                  placeholder="Regiao"
                  autoComplete="off"
                  ref={amazonForm.register()}
                />
              </InputGroup>

              <InputGroup>
                <MdVpnKey
                  style={{ marginLeft: '1.1rem', position: 'absolute' }}
                  color="#383A3D"
                  size="1em"
                />
                <input
                  name="name"
                  placeholder="Nome"
                  autoComplete="off"
                  ref={amazonForm.register()}
                />
              </InputGroup>
            </CardBody>
            <CardFooter>
              <GreenButton
                type="submit"
                backgroundColor="mountainMeadow"
                color="white"
              >
                {loading ? 'Carregando...' : 'Salvar'}
              </GreenButton>
              <Link to="/qualis">Voltar</Link>
            </CardFooter>
          </form>
        )}
      </Card>

      <Card>
        <CardHeader>
          <Logo>
            <LogoSecundary>
              <p>Configuração de SMS</p>
            </LogoSecundary>
          </Logo>
          <Divider />
        </CardHeader>
        <form
          onSubmit={smsForm.handleSubmit(handleOnSubmitGmail)}
          autoComplete="off"
        >
          <CardBody>
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
                ref={smsForm.register()}
              />
            </InputGroup>
            {smsForm.errors.username &&
              smsForm.errors.username.type === 'required' && (
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
                ref={smsForm.register()}
              />
            </InputGroup>
            {smsForm.errors.password &&
              smsForm.errors.password.type === 'required' && (
                <span>A Senha é obrigatória</span>
              )}
            <InputGroup>
              <MdVpnKey
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="region"
                placeholder="Região"
                autoComplete="off"
                ref={smsForm.register()}
              />
            </InputGroup>
            {smsForm.errors.region &&
              smsForm.errors.region.type === 'required' && (
                <span>O campo região é obrigatório</span>
              )}
            {smsForm.errors.region &&
              smsForm.errors.region.type === undefined && (
                <span>{smsForm.errors.region.message}</span>
              )}
            <InputGroup>
              <MdVpnKey
                style={{ marginLeft: '1.1rem', position: 'absolute' }}
                color="#383A3D"
                size="1em"
              />
              <input
                name="name"
                placeholder="Remetente"
                autoComplete="off"
                ref={smsForm.register()}
              />
            </InputGroup>
            {smsForm.errors.name && smsForm.errors.name.type === 'required' && (
              <span>O campo nome é obrigatório</span>
            )}
            {smsForm.errors.name && smsForm.errors.name.type === undefined && (
              <span>{smsForm.errors.name.message}</span>
            )}
          </CardBody>
          <CardFooter>
            <GreenButton
              type="submit"
              backgroundColor="mountainMeadow"
              color="white"
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </GreenButton>
            <Link to="/qualis">Voltar</Link>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
}
