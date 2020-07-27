import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Inbox, Delete } from '@material-ui/icons';
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
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [etherealRecipients, setEtherealRecipients] = useState([]);
  const [sesRecipients, setSesRecipients] = useState([]);
  const history = useHistory();
  const [provider, setProvider] = useState('');
  const [smsChanel, setSmsChanel] = useState('whatsapp');
  const [keycloak] = useKeycloak();

  const [hasMailer, setMailer] = useState(false);

  const [ethereal, setEthereal] = useState({
    address: '',
    host: '',
    pass: '',
    user: '',
    port: '',
    name: '',
  });

  const [ses, setSes] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    name: '',
  });

  const recipientsNames = {
    usersNotApproved: 'Usuários não aprovados',
    suport: 'Suporte',
  };

  const etherealSchema = yup.object().shape({
    user: yup.string().required(),
    pass: yup.string().required(),
    host: yup.string().required(),
    port: yup.string().required(),
    address: yup.string().required(),
    name: yup.string().required(),
  });

  const sesSchema = yup.object().shape({
    accessKeyId: yup.string().required(),
    secretAccessKey: yup.string().required(),
    name: yup.string().required(),
    region: yup.string().required(),
  });

  const smsSchema = yup.object().shape({
    zenviaSecretKey: yup.string().required(),
    from: yup.string().required(),
  });

  const recipientSchema = yup.object().shape({
    address: yup.string().required(),
    name: yup.string().required(),
  });

  const etherealForm = useForm({
    validationSchema: etherealSchema,
  });

  const sesForm = useForm({
    validationSchema: sesSchema,
  });

  const smsForm = useForm({
    validationSchema: smsSchema,
  });

  const suportForm = useForm({
    validationSchema: recipientSchema,
  });

  const usersForm = useForm({
    validationSchema: recipientSchema,
  });

  function loadEthereal() {
    etherealForm.setValue('address', ethereal.address);
    etherealForm.setValue('name', ethereal.name);
    etherealForm.setValue('host', ethereal.host);
    etherealForm.setValue('port', ethereal.port);
    etherealForm.setValue('user', ethereal.user);
    etherealForm.setValue('pass', ethereal.pass);
  }

  function loadSes() {
    sesForm.setValue('accessKeyId', ses.accessKeyId);
    sesForm.setValue('secretAccessKey', ses.secretAccessKey);
    sesForm.setValue('region', ses.region);
    sesForm.setValue('name', ses.name);
  }

  useEffect(() => {
    async function fetchMailer() {
      const response = await api.get('mails', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });

      if (response.data) {
        setMailer(true);
        if (response.data.type === 'ethereal') {
          const { address, host, pass, user, port, name } = response.data;
          setProvider('ethereal');
          setEthereal({ address, host, pass, user, port, name });

          const dest_response = await api.get('mails/destinataries', {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          });

          if (dest_response.data) {
            setEtherealRecipients(dest_response.data);
          }
        } else if (response.data.type === 'ses') {
          const { accessKeyId, secretAccessKey, region, name } = response.data;
          setProvider('ses');
          setSes({ accessKeyId, secretAccessKey, region, name });

          const dest_response = await api.get('mails/destinataries', {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          });

          if (dest_response.data) {
            setSesRecipients(dest_response.data);
          }
        }

        setLoaded(true);
        loadEthereal();
        loadSes();
      } else {
        setProvider('ethereal');
        setLoaded(true);
      }
    }

    setLoading(false);
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

    if (value === 'ses') {
      loadSes();
    } else if (value === 'ethereal') {
      loadEthereal();
    }
  }

  function handleOnSubmitethereal(data) {
    data.type = 'ethereal';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
        setEthereal(data);
        setMailer(true);
      })
      .catch(() => {
        toast.error('Erro ao configurar email!');
      });
  }

  function handleOnSubmitses(data) {
    data.type = 'ses';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
        setSes(data);
        setMailer(true);
      })
      .catch(() => {
        toast.error('Erro ao configurar email!');
      });
  }

  function handleOnSubmitSuport(data) {
    const suport = {
      destinatary_type: 'suport',
      name: data.name,
      address: data.address,
    };

    api
      .post('/mails/createDestinataries', suport, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Destinatário para suporte configurado!');

        api
          .get('mails/destinataries', {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          })
          .then(res => {
            if (res) setEtherealRecipients(res.data);
          });
      })
      .catch(() => {
        toast.error('Erro ao configurar destinatário para suporte!');
      });
  }

  function handleOnSubmitUsers(data) {
    const usersNotApproved = {
      destinatary_type: 'usersNotApproved',
      name: data.name,
      address: data.address,
    };

    api
      .post('/mails/createDestinataries', usersNotApproved, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Destinatário para usuários não aprovados configurado!');
        api
          .get('mails/destinataries', {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          })
          .then(res => {
            if (res) setEtherealRecipients(res.data);
          });
      })
      .catch(() => {
        toast.error(
          'Erro ao configurar destinatário para Usuários não aprovados!'
        );
      });
  }

  async function handleDeleteRecipient(r) {
    api
      .delete(`mails/removeDestinatary/${r.id}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      })
      .then(() => {
        toast.success('Destinatário deletado!');
        api
          .get('mails/destinataries', {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          })
          .then(res => {
            if (res) setEtherealRecipients(res.data);
          });
      })
      .catch(() => {
        toast.error('Erro ao deletar destinatário!');
      });
  }

  function handleChangeSmsChanel(evt) {
    const { value } = evt.target;
    setSmsChanel(value);
  }

  function handleDeleteMailer() {
    api
      .delete('/mails/removeMail', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Configuração de E-mail deletada!');
        setMailer(false);
      })
      .catch(() => {
        toast.error('Erro ao deletar configuração de E-mail!');
      });
  }

  function handleDeleteSms() {
    api
      .delete('/sms/delete', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Configuração de SMS deletada!');
      })
      .catch(() => {
        toast.error('Erro ao deletar configuração de SMS!');
      });
  }

  return (
    <>
      {loaded ? (
        <Container>
          <Scroll>
            <Card>
              <CardHeader title="Configuração de E-mail" />
              {provider === 'ethereal' ? (
                <>
                  <form
                    onSubmit={etherealForm.handleSubmit(handleOnSubmitethereal)}
                    autoComplete="off"
                  >
                    <CardContent>
                      <ChoiceGroup>
                        <div>
                          <input
                            type="radio"
                            id="provider-ethereal"
                            name="provider"
                            value="ethereal"
                            onChange={handleChangeProvider}
                            checked={provider === 'ethereal'}
                          />
                          <label htmlFor="provider-ethereal">Gmail</label>
                          <input
                            type="radio"
                            id="provider-ses"
                            name="provider"
                            value="ses"
                            onChange={handleChangeProvider}
                            checked={provider === 'ses'}
                          />
                          <label htmlFor="provider-ses">Amazon</label>
                        </div>
                      </ChoiceGroup>
                      <InputsGroup>
                        <div>
                          <InputGroup>
                            <input
                              name="name"
                              placeholder="Nome"
                              autoComplete="off"
                              ref={etherealForm.register()}
                            />
                            <label>Nome</label>
                          </InputGroup>
                          {etherealForm.errors.name &&
                            etherealForm.errors.name.type === 'required' && (
                              <span>O nome é obrigatória</span>
                            )}
                        </div>
                        <div>
                          <InputGroup>
                            <input
                              name="address"
                              placeholder="Endereço"
                              autoComplete="off"
                              ref={etherealForm.register()}
                            />
                            <label>Endereço</label>
                          </InputGroup>
                          {etherealForm.errors.user &&
                            etherealForm.errors.user.type === 'required' && (
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
                              ref={etherealForm.register()}
                            />
                            <label>Endereço do Servidor</label>
                          </InputGroup>
                          {etherealForm.errors.host &&
                            etherealForm.errors.host.type === 'required' && (
                              <span>O endereço do servidor é obrigatório</span>
                            )}
                          {etherealForm.errors.host &&
                            etherealForm.errors.host.type === undefined && (
                              <span>{etherealForm.errors.host.message}</span>
                            )}
                        </div>
                        <div>
                          <InputGroup>
                            <input
                              name="port"
                              type="number"
                              placeholder="Porta"
                              autoComplete="off"
                              ref={etherealForm.register()}
                            />
                            <label>Porta</label>
                          </InputGroup>
                          {etherealForm.errors.port &&
                            etherealForm.errors.port.type === 'required' && (
                              <span>A porta é obrigatória</span>
                            )}
                          {etherealForm.errors.port &&
                            etherealForm.errors.port.type === undefined && (
                              <span>{etherealForm.errors.port.message}</span>
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
                              ref={etherealForm.register()}
                            />
                            <label>Usuário</label>
                          </InputGroup>
                          {etherealForm.errors.user &&
                            etherealForm.errors.user.type === 'required' && (
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
                              ref={etherealForm.register()}
                            />
                            <label>Senha</label>
                          </InputGroup>
                          {etherealForm.errors.pass &&
                            etherealForm.errors.pass.type === 'required' && (
                              <span>A Senha é obrigatória</span>
                            )}
                        </div>
                      </InputsGroup>
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
                            handleDeleteMailer();
                          }}
                        >
                          {loading ? 'Carregando...' : 'Deletar'}
                        </Button>
                      </CardActions>
                    </CardContent>
                  </form>
                  <CardHeader title="Configuração de Destinatários" />
                  {!etherealRecipients
                    .map(r => r.destinatary_type)
                    .includes('suport') && hasMailer ? (
                    <CardContent>
                      <form
                        onSubmit={suportForm.handleSubmit(handleOnSubmitSuport)}
                      >
                        <h4>Suporte</h4>
                        <InputsGroup>
                          <div>
                            <InputGroup>
                              <input
                                name="name"
                                placeholder="Nome"
                                autoComplete="off"
                                ref={suportForm.register()}
                              />
                              <label>Nome</label>
                            </InputGroup>
                            {suportForm.errors.name &&
                              suportForm.errors.name.type === 'required' && (
                                <span>O nome é obrigatória</span>
                              )}
                          </div>
                          <div>
                            <InputGroup>
                              <input
                                name="address"
                                placeholder="Endereço"
                                autoComplete="off"
                                ref={suportForm.register()}
                              />
                              <label>Endereço</label>
                            </InputGroup>
                            {suportForm.errors.user &&
                              suportForm.errors.user.type === 'required' && (
                                <span>O endereço é obrigatório</span>
                              )}
                          </div>
                          <CardActions>
                            <Button
                              type="submit"
                              backgroundColor="mountainMeadow"
                              color="white"
                              disabled={loading}
                            >
                              {loading ? 'Carregando...' : 'Adicionar'}
                            </Button>
                          </CardActions>
                        </InputsGroup>
                      </form>
                    </CardContent>
                  ) : null}

                  {!etherealRecipients
                    .map(r => r.destinatary_type)
                    .includes('usersNotApproved') && hasMailer ? (
                    <CardContent>
                      <form
                        onSubmit={usersForm.handleSubmit(handleOnSubmitUsers)}
                      >
                        <h4>Usuários não aprovados</h4>
                        <InputsGroup>
                          <div>
                            <InputGroup>
                              <input
                                name="name"
                                placeholder="Nome"
                                autoComplete="off"
                                ref={usersForm.register()}
                              />
                              <label>Nome</label>
                            </InputGroup>
                            {usersForm.errors.name &&
                              usersForm.errors.name.type === 'required' && (
                                <span>O nome é obrigatória</span>
                              )}
                          </div>
                          <div>
                            <InputGroup>
                              <input
                                name="address"
                                placeholder="Endereço"
                                autoComplete="off"
                                ref={usersForm.register()}
                              />
                              <label>Endereço</label>
                            </InputGroup>
                            {usersForm.errors.user &&
                              usersForm.errors.user.type === 'required' && (
                                <span>O endereço é obrigatório</span>
                              )}
                          </div>
                          <CardActions>
                            <Button
                              type="submit"
                              backgroundColor="mountainMeadow"
                              color="white"
                              disabled={loading}
                            >
                              {loading ? 'Carregando...' : 'Adicionar'}
                            </Button>
                          </CardActions>
                        </InputsGroup>
                      </form>
                    </CardContent>
                  ) : null}
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Destinatários
                      </ListSubheader>
                    }
                  >
                    {etherealRecipients.map(r => (
                      <ListItem button key={r.name}>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <ListItemText primary={`${r.name}: ${r.address}`} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteRecipient(r)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {etherealRecipients.length ? null : (
                      <ListItem button>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Não há destinatários cadastrados." />
                      </ListItem>
                    )}
                  </List>
                </>
              ) : (
                <>
                  <form
                    onSubmit={sesForm.handleSubmit(handleOnSubmitses)}
                    autoComplete="off"
                  >
                    <CardContent>
                      <ChoiceGroup>
                        <div>
                          <input
                            type="radio"
                            id="provider-ethereal"
                            name="provider"
                            value="ethereal"
                            onChange={handleChangeProvider}
                            defaultChecked
                          />
                          <label htmlFor="provider-ethereal">Gmail</label>
                          <input
                            type="radio"
                            id="provider-ses"
                            name="provider"
                            value="ses"
                            onChange={handleChangeProvider}
                          />
                          <label htmlFor="provider-ses">Amazon</label>
                        </div>
                      </ChoiceGroup>
                      <InputsGroup>
                        <div>
                          <InputGroup>
                            <input
                              name="name"
                              placeholder="Nome"
                              autoComplete="off"
                              ref={sesForm.register()}
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
                              ref={sesForm.register()}
                            />
                            <label>Região</label>
                          </InputGroup>
                          {sesForm.errors.region &&
                            sesForm.errors.region.type === 'required' && (
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
                              ref={sesForm.register()}
                            />
                            <label>Chave de acesso</label>
                          </InputGroup>
                          {sesForm.errors.accessKeyId &&
                            sesForm.errors.accessKeyId.type === 'required' && (
                              <span>A Chave é obrigatória!</span>
                            )}
                          {sesForm.errors.accessKeyId &&
                            sesForm.errors.accessKeyId.type === undefined && (
                              <span>{sesForm.errors.accessKeyId.message}</span>
                            )}
                        </div>
                        <div>
                          <InputGroup>
                            <input
                              name="secretAccessKey"
                              placeholder="Chave de acesso secreta"
                              autoComplete="off"
                              ref={sesForm.register()}
                            />
                            <label>Chave de acesso secreta</label>
                          </InputGroup>
                          {sesForm.errors.secretAccessKey &&
                            sesForm.errors.secretAccessKey.type ===
                              'required' && (
                              <span>A Chave secreta é obrigatória!</span>
                            )}
                          {sesForm.errors.secretAccessKey &&
                            sesForm.errors.secretAccessKey.type ===
                              undefined && (
                              <span>
                                {sesForm.errors.secretAccessKey.message}
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
                          handleDeleteSms();
                        }}
                      >
                        {loading ? 'Carregando...' : 'Deletar'}
                      </Button>
                    </CardActions>
                  </form>

                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Destinatários
                      </ListSubheader>
                    }
                  >
                    {sesRecipients.map(r => (
                      <ListItem button key={r.name}>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <ListItemText primary={recipientsNames[r.name]} />
                      </ListItem>
                    ))}
                    {sesRecipients.length ? null : (
                      <ListItem button>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Não há destinatários cadastrados." />
                      </ListItem>
                    )}
                  </List>

                </>
              )}
            </Card>
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
                    {loading ? 'Carregando...' : 'Deletar'}
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
