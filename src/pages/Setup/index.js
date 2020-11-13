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
  Tabs,
  Tab,
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

function GmailForm(props) {
  const {
    children,
    value,
    index,
    submitMailer,
    translateDestinataries,
    form,
    deleteMailer,
    hasMailer,
    usersNotApproved,
    suport,
    healthService,
    suportForm,
    submitSuport,
    healthForm,
    submitHealth,
    usersForm,
    submitUsers,
    deleteRecipient,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <form onSubmit={form.handleSubmit(submitMailer)} autoComplete="off">
            <CardContent>
              <InputsGroup>
                <div>
                  <InputGroup>
                    <input
                      name="name"
                      placeholder="Nome"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Nome</label>
                  </InputGroup>
                  {form.errors.name && form.errors.name.type === 'required' && (
                    <span>O nome é obrigatória</span>
                  )}
                </div>
                <div>
                  <InputGroup>
                    <input
                      name="address"
                      placeholder="Endereço de E-mail"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Endereço de E-mail</label>
                  </InputGroup>
                  {form.errors.user && form.errors.user.type === 'required' && (
                    <span>O endereço de e-mail é obrigatório</span>
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
                      ref={form.register()}
                    />
                    <label>Endereço do Servidor</label>
                  </InputGroup>
                  {form.errors.host && form.errors.host.type === 'required' && (
                    <span>O endereço do servidor é obrigatório</span>
                  )}
                  {form.errors.host && form.errors.host.type === undefined && (
                    <span>{form.errors.host.message}</span>
                  )}
                </div>
                <div>
                  <InputGroup>
                    <input
                      name="port"
                      type="number"
                      placeholder="Porta"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Porta</label>
                  </InputGroup>
                  {form.errors.port && form.errors.port.type === 'required' && (
                    <span>A porta é obrigatória</span>
                  )}
                  {form.errors.port && form.errors.port.type === undefined && (
                    <span>{form.errors.port.message}</span>
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
                      ref={form.register()}
                    />
                    <label>Usuário</label>
                  </InputGroup>
                  {form.errors.user && form.errors.user.type === 'required' && (
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
                      ref={form.register()}
                    />
                    <label>Senha</label>
                  </InputGroup>
                  {form.errors.pass && form.errors.pass.type === 'required' && (
                    <span>A Senha é obrigatória</span>
                  )}
                </div>
              </InputsGroup>
              <CardActions>
                <Button
                  type="submit"
                  backgroundColor="mountainMeadow"
                  color="white"
                  // disabled={loading}
                >
                  {/* {loading ? 'Carregando...' : 'Atualizar'} */}
                  Atualizar
                </Button>
                <Button
                  type="button"
                  backgroundColor="sunset"
                  color="white"
                  // disabled={loading}
                  onClick={deleteMailer}
                >
                  {/* {loading ? 'Carregando...' : 'Deletar'} */}
                  Deletar
                </Button>
              </CardActions>
            </CardContent>
          </form>
          {hasMailer && (
            <>
              <CardHeader title="Configuração de Destinatários" />
              {
                <CardContent>
                  <form onSubmit={suportForm.handleSubmit(submitSuport)}>
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
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={suportForm.register()}
                          />
                          <label>Endereço de E-mail</label>
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
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              {
                <CardContent>
                  <form onSubmit={usersForm.handleSubmit(submitUsers)}>
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
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={usersForm.register()}
                          />
                          <label>Endereço de E-mail</label>
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
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              {
                <CardContent>
                  <form onSubmit={healthForm.handleSubmit(submitHealth)}>
                    <h4>Serviço de saúde</h4>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="name"
                            placeholder="Nome"
                            autoComplete="off"
                            ref={healthForm.register()}
                          />
                          <label>Nome</label>
                        </InputGroup>
                        {healthForm.errors.name &&
                          healthForm.errors.name.type === 'required' && (
                            <span>O nome é obrigatória</span>
                          )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="address"
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={healthForm.register()}
                          />
                          <label>Endereço de E-mail</label>
                        </InputGroup>
                        {healthForm.errors.user &&
                          healthForm.errors.user.type === 'required' && (
                            <span>O endereço é obrigatório</span>
                          )}
                      </div>
                      <CardActions>
                        <Button
                          type="submit"
                          backgroundColor="mountainMeadow"
                          color="white"
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Usuários Não Aprovados
                  </ListSubheader>
                }
              >
                {usersNotApproved.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {usersNotApproved.length ? null : (
                  <ListItem button>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Não há destinatários cadastrados." />
                  </ListItem>
                )}
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Suporte
                  </ListSubheader>
                }
              >
                {suport.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {suport.length ? null : (
                  <ListItem button>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Não há destinatários cadastrados." />
                  </ListItem>
                )}
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Serviço de saúde
                  </ListSubheader>
                }
              >
                {healthService.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {healthService.length ? null : (
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
        </>
      )}
    </div>
  );
}

function AmazonForm(props) {
  const {
    children,
    value,
    index,
    submitMailer,
    form,
    deleteMailer,
    hasMailer,
    usersNotApproved,
    suport,
    healthService,
    suportForm,
    submitSuport,
    healthForm,
    submitHealth,
    usersForm,
    submitUsers,
    deleteRecipient,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <form onSubmit={form.handleSubmit(submitMailer)} autoComplete="off">
            <CardContent>
              <InputsGroup>
                <div>
                  <InputGroup>
                    <input
                      name="name"
                      placeholder="Nome"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Nome</label>
                  </InputGroup>
                </div>
                <div>
                  <InputGroup>
                    <input
                      name="address"
                      placeholder="Endereço de E-mail"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Endereço de E-mail</label>
                  </InputGroup>
                  {form.errors.address &&
                  form.errors.address.type === 'required' && (
                    <span>O endereço de e-mail é obrigatório</span>
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
                      ref={form.register()}
                    />
                    <label>Chave de acesso</label>
                  </InputGroup>
                  {form.errors.accessKeyId &&
                    form.errors.accessKeyId.type === 'required' && (
                      <span>A Chave é obrigatória!</span>
                    )}
                  {form.errors.accessKeyId &&
                    form.errors.accessKeyId.type === undefined && (
                      <span>{form.errors.accessKeyId.message}</span>
                    )}
                </div>
                <div>
                  <InputGroup>
                    <input
                      name="secretAccessKey"
                      placeholder="Chave de acesso secreta"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Chave de acesso secreta</label>
                  </InputGroup>
                  {form.errors.secretAccessKey &&
                    form.errors.secretAccessKey.type === 'required' && (
                      <span>A Chave secreta é obrigatória!</span>
                    )}
                  {form.errors.secretAccessKey &&
                    form.errors.secretAccessKey.type === undefined && (
                      <span>{form.errors.secretAccessKey.message}</span>
                    )}
                </div>
                <div>
                  <InputGroup>
                    <input
                      name="region"
                      placeholder="Região"
                      autoComplete="off"
                      ref={form.register()}
                    />
                    <label>Região</label>
                  </InputGroup>
                  {form.errors.region &&
                  form.errors.region.type === 'required' && (
                    <span>Região é obrigatório</span>
                  )}
                </div>
              </InputsGroup>
              <CardActions>
                <Button
                  type="submit"
                  backgroundColor="mountainMeadow"
                  color="white"
                  // disabled={loading}
                >
                  {/* {loading ? 'Carregando...' : 'Atualizar'} */}
                  Atualizar
                </Button>
                <Button
                  type="button"
                  backgroundColor="sunset"
                  color="white"
                  // disabled={loading}
                  onClick={deleteMailer}
                >
                  {/* {loading ? 'Carregando...' : 'Deletar'} */}
                  Deletar
                </Button>
              </CardActions>
            </CardContent>
          </form>
          {hasMailer && (
            <>
              <CardHeader title="Configuração de Destinatários" />
              {
                <CardContent>
                  <form onSubmit={suportForm.handleSubmit(submitSuport)}>
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
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={suportForm.register()}
                          />
                          <label>Endereço de E-mail</label>
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
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              {<CardContent>
                  <form onSubmit={usersForm.handleSubmit(submitUsers)}>
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
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={usersForm.register()}
                          />
                          <label>Endereço de E-mail</label>
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
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              {<CardContent>
                  <form onSubmit={healthForm.handleSubmit(submitHealth)}>
                    <h4>Serviço de saúde</h4>
                    <InputsGroup>
                      <div>
                        <InputGroup>
                          <input
                            name="name"
                            placeholder="Nome"
                            autoComplete="off"
                            ref={healthForm.register()}
                          />
                          <label>Nome</label>
                        </InputGroup>
                        {healthForm.errors.name &&
                        healthForm.errors.name.type === 'required' && (
                          <span>O nome é obrigatória</span>
                        )}
                      </div>
                      <div>
                        <InputGroup>
                          <input
                            name="address"
                            placeholder="Endereço de E-mail"
                            autoComplete="off"
                            ref={healthForm.register()}
                          />
                          <label>Endereço de E-mail</label>
                        </InputGroup>
                        {healthForm.errors.user &&
                        healthForm.errors.user.type === 'required' && (
                          <span>O endereço é obrigatório</span>
                        )}
                      </div>
                      <CardActions>
                        <Button
                          type="submit"
                          backgroundColor="mountainMeadow"
                          color="white"
                        >
                          Adicionar
                        </Button>
                      </CardActions>
                    </InputsGroup>
                  </form>
                </CardContent>
              }
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Usuários Não Aprovados
                  </ListSubheader>
                }
              >
                {usersNotApproved.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {usersNotApproved.length ? null : (
                  <ListItem button>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Não há destinatários cadastrados." />
                  </ListItem>
                )}
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Suporte
                  </ListSubheader>
                }
              >
                {suport.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {suport.length ? null : (
                  <ListItem button>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Não há destinatários cadastrados." />
                  </ListItem>
                )}
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Serviço de saúde
                  </ListSubheader>
                }
              >
                {healthService.map(r => (
                  <ListItem button key={r.name}>
                    <ListItemIcon>
                      <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={`${r.name}: ${r.address}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteRecipient(r)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {healthService.length ? null : (
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
        </>
      )}
    </div>
  );
}

export default function Setup() {
  const [keycloak] = useKeycloak();

  const [loaded, setLoaded] = useState(false);
  const [smsLoaded, setSmsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [hasMailer, setHasMailer] = useState(false);
  const [hasSms, setHasSms] = useState(false);
  const [mailer, setMailer] = useState('ethereal');
  const [recipients, setRecipients] = useState([]);
  const [smsChanel, setSmsChanel] = useState('whatsapp');
  const [usersNotApproved, setUsersNotApproved] = useState([])
  const [suport, setSuport] = useState([])
  const [healthService, setHealthService] = useState([])

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
    address:'',
  });

  const [sms, setSms] = useState({
    from: '',
    zenviaSecretKey: '',
  });

  const etherealSchema = yup.object().shape({
    user: yup.string().required(),
    pass: yup.string().required(),
    host: yup.string().required(),
    port: yup.string().required(),
    address: yup.string().required(),
    name: yup.string().required(),
  });

  const etherealForm = useForm({
    validationSchema: etherealSchema,
  });

  const sesSchema = yup.object().shape({
    accessKeyId: yup.string().required(),
    secretAccessKey: yup.string().required(),
    name: yup.string().required(),
    region: yup.string().required(),
    address: yup.string().required(),
  });

  const sesForm = useForm({
    validationSchema: sesSchema,
  });

  const recipientSchema = yup.object().shape({
    address: yup.string().required(),
    name: yup.string().required(),
  });

  const suportForm = useForm({
    validationSchema: recipientSchema,
  });

  const usersForm = useForm({
    validationSchema: recipientSchema,
  });

  const healthForm = useForm({
    validationSchema: recipientSchema,
  });

  const smsSchema = yup.object().shape({
    zenviaSecretKey: yup.string().required(),
    from: yup.string().required(),
  });

  const smsForm = useForm({
    validationSchema: smsSchema,
  });

  async function getRecipients() {
    const rec_response = await api.get('mails/destinataries', {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    });

    if (rec_response.data) {
      const notApproved = []
      const sup = []
      const health = []
      rec_response.data.forEach( response => {
        if(response.destinatary_type === 'usersNotApproved') {
          notApproved.push(response)
          setUsersNotApproved([...notApproved])
        }
        if(response.destinatary_type === 'suport') {
          sup.push(response)
          setSuport([...sup])
        }
        if(response.destinatary_type === 'healthService') {
          health.push(response)
          setHealthService([...health])
        }
      })
      setRecipients(rec_response.data);
    }
  }

  useEffect(() => {
    async function fetchMailer() {
      const response = await api.get('mails', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });

      if (response.data) {
        setHasMailer(true);
        if (response.data.type === 'ethereal') {
          const { address, host, pass, user, port, name } = response.data;
          setEthereal({ address, host, pass, user, port, name });
          setMailer('ethereal');
          setTab(0);

          getRecipients();
        } else if (response.data.type === 'ses') {
          const { accessKeyId, secretAccessKey, region, name, address } = response.data;
          setSes({ accessKeyId, secretAccessKey, region, name, address });
          setMailer('ses');
          setTab(1);

          getRecipients();
        }
      }

      setLoaded(true);
    }
    fetchMailer();
  }, []);

  useEffect(() => {
    if (hasMailer && loaded) {
      if (mailer === 'ethereal') {
        etherealForm.setValue('address', ethereal.address);
        etherealForm.setValue('name', ethereal.name);
        etherealForm.setValue('host', ethereal.host);
        etherealForm.setValue('port', ethereal.port);
        etherealForm.setValue('user', ethereal.user);
        etherealForm.setValue('pass', ethereal.pass);
      } else if (mailer === 'ses') {
        sesForm.setValue('accessKeyId', ses.accessKeyId);
        sesForm.setValue('secretAccessKey', ses.secretAccessKey);
        sesForm.setValue('region', ses.region);
        sesForm.setValue('name', ses.name);
        sesForm.setValue('address', ses.address);
      }
    }
  }, [hasMailer, mailer, loaded, etherealForm, sesForm]);

  useEffect(() => {
    async function fetchSms() {
      const response = await api.get('sms', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });

      if (response.data) {
        const { chanel, from, zenviaSecretKey } = response.data;
        setSmsChanel(chanel);
        setSms({ from, zenviaSecretKey });
        setHasSms(true);
      }

      setSmsLoaded(true);
    }
    fetchSms();
  }, []);

  useEffect(() => {
    if (hasSms && smsLoaded) {
      smsForm.setValue('zenviaSecretKey', sms.zenviaSecretKey);
      smsForm.setValue('from', sms.from);
    }
  }, [hasSms, sms, smsLoaded, smsForm]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function handleDeleteMailer() {
    api
      .delete('/mails/removeMail', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Configuração de E-mail deletada!');
        setEthereal({
          address: '',
          host: '',
          pass: '',
          user: '',
          port: '',
          name: '',
        });
        setHasMailer(false);
      })
      .catch(() => {
        toast.error('Erro ao deletar configuração de E-mail!');
      });
  }

  function handleSubmitEthereal(data) {
    data.type = 'ethereal';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
        const { address, host, pass, user, port, name } = data;
        setEthereal({ address, host, pass, user, port, name });
        setHasMailer(true);
        setMailer('ethereal');
        setTab(0);
      })
      .catch(() => {
        toast.error('Erro ao configurar email!');
      });
  }

  function handleSubmitSes(data) {
    data.type = 'ses';

    api
      .post('/mails/createMail', data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('E-mail configurado com sucesso!');
        const { accessKeyId, secretAccessKey, region, name, address } = data;
        setSes({ accessKeyId, secretAccessKey, region, name, address });
        setHasMailer(true);
        setMailer('ses');
        setTab(1);
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
        getRecipients();
      })
      .catch((e) => {
        if(e.response.status == 409) {
          return toast.error(
            'Dest. suporte já cadastrado'
          );
        }
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
        toast.success('Dest. para usuários não aprovados configurado!');
        getRecipients();
      })
      .catch((e) => {
        if(e.response.status == 409) {
          return toast.error(
            'Dest. para usuarios não aprovados já cadastrado'
          );
        }
        toast.error(
          'Erro ao configurar destinatário para Usuários não aprovados!'
        );
      });
  }

  function handleOnSubmitHealth(data) {
    const healthService = {
      destinatary_type: 'healthService',
      name: data.name,
      address: data.address,
    };

    api
      .post('/mails/createDestinataries', healthService, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(() => {
        toast.success('Destinatário para serviço de saúde configurado!');
        getRecipients();
      })
      .catch((e) => {
        if(e.response.status == 409) {
          return toast.error(
            'Dest. saúde já cadastrado!'
          );
        }
        toast.error(
          'Erro ao configurar destinatário para serviço de saúde!'
        );
      });
  }

  async function handleDeleteRecipient(r) {
    if(r.destinatary_type == "usersNotApproved") {
      setUsersNotApproved(usersNotApproved.filter(user => user.id != r.id))
    }else if(r.destinatary_type == "suport"){
      setSuport(suport.filter(user => user.id != r.id))
    }else {
      setHealthService(healthService.filter(user => user.id != r.id))
    }
    api
      .delete(`mails/removeDestinatary/${r.id}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      })
      .then(() => {
        toast.success('Destinatário deletado!');
        getRecipients();
      })
      .catch(() => {
        toast.error('Erro ao deletar destinatário!');
      });
  }

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

  function handleChangeSmsChanel(evt) {
    const { value } = evt.target;
    setSmsChanel(value);
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
      {loaded && smsLoaded ? (
        <Container>
          <Scroll>
            <Card>
              <CardHeader title="Configuração de E-mail" />
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTab}
                aria-label="disabled tabs example"
              >
                <Tab label="Gmail" disabled={hasMailer && mailer === 'ses'} />
                <Tab
                  label="Amazon"
                  disabled={hasMailer && mailer === 'ethereal'}
                />
              </Tabs>
              <GmailForm
                value={tab}
                index={0}
                form={etherealForm}
                submitMailer={handleSubmitEthereal}
                deleteMailer={handleDeleteMailer}
                hasMailer={hasMailer}
                usersNotApproved={usersNotApproved}
                suport={suport}
                healthService={healthService}
                suportForm={suportForm}
                healthForm={healthForm}
                submitSuport={handleOnSubmitSuport}
                submitHealth={handleOnSubmitHealth}
                usersForm={usersForm}
                submitUsers={handleOnSubmitUsers}
                deleteRecipient={handleDeleteRecipient}
              />
              <AmazonForm
                value={tab}
                index={1}
                form={sesForm}
                submitMailer={handleSubmitSes}
                deleteMailer={handleDeleteMailer}
                hasMailer={hasMailer}
                usersNotApproved={usersNotApproved}
                suport={suport}
                healthService={healthService}
                suportForm={suportForm}
                healthForm={healthForm}
                submitSuport={handleOnSubmitSuport}
                submitHealth={handleOnSubmitHealth}
                usersForm={usersForm}
                submitUsers={handleOnSubmitUsers}
                deleteRecipient={handleDeleteRecipient}
              />
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
                    onClick={handleDeleteSms}
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
