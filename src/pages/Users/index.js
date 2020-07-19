import React, { useState, useEffect } from 'react';
import { CircularProgress, CardContent } from '@material-ui/core';

import { Form } from '@rocketseat/unform';

import { useKeycloak } from '@react-keycloak/web';

import { Assignment } from '@material-ui/icons';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  Container,
  Content,
  MyCard,
  CardHeader,
  Scroll,
  Loading,
  FormCard,
  ChoiceGroup,
  FormButtonGroup,
} from './styles';
import Button from '~/components/Buttons/Button';

import Table from '~/components/Table';

export default function Users() {
  const initialState = {
    enabled: false,
    infectologist: false,
    assisted: false,
    admin: false,
    user: false,
    responsible: false,
  };

  const [loaded, setLoaded] = useState(true);
  const [keycloak] = useKeycloak();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formState, setFormState] = useState(initialState);

  const [selected, selectUser] = useState(null);

  const handleManageUser = user => {
    const userRoles = initialState;

    const parsedRoles = user.roles.map(role => {
      userRoles[role.name] = true;
      return role;
    });

    if (parsedRoles.length) userRoles.enabled = true;

    setFormState(userRoles);
    selectUser(user);
  };

  const options = {
    filtering: false,
    grouping: false,
    actionsColumnIndex: -1,
  };

  const actions = [
    {
      icon: () => <Assignment />,
      tooltip: 'Manage User',
      onClick: (event, rowData) => handleManageUser(rowData),
    },
  ];

  const columns = [
    {
      field: 'user.username',
      title: 'Username',
      filtering: false,
    },
    {
      field: 'user.emailVerified',
      title: 'E-mail',
      filtering: false,
    },
    {
      field: 'roles',
      title: 'Roles',
      render: rowData => rowData.roles.map(role => role.name).join(', '),
    },
    {
      field: 'enabled',
      title: 'Status',
      render: rowData =>
        rowData.roles.filter(
          role =>
            !(
              role.name === 'uma_authorization' ||
              role.name === 'offline_access'
            )
        ).length ? (
          <p style={{ color: '#22BA71', fontWeight: 'bold' }}>Permitido</p>
        ) : (
          <p style={{ color: '#C54A48', fontWeight: 'bold' }}>Negado</p>
        ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('users', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });

      if (response.data) setUsers(response.data);
      setLoaded(true);
    }
    fetchData();
  }, [keycloak.token, selected]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('users/roles', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setRoles(response.data);
    }
    fetchData();
  }, []);

  function formatDate() {
    return format(new Date(), 'dd/MM');
  }

  async function handleFormAnswer() {
    if (
      formState.enabled === true &&
      Object.keys(formState).filter(key => formState[key] === true).length === 1
    ) {
      toast.error('Você precisa selecionar pelo menos 1 role!');
    } else {
      const { id } = selected.user;
      const userRoles = selected.roles;

      const deleteRole = userRoles
        .filter(role => formState[role.name] === false)
        .map(role => {
          return { roleName: role.name, id };
        });

      const addRole = Object.keys(formState)
        .filter(role => role !== 'enabled')
        .filter(role => formState[role] === true)
        .filter(role => !userRoles.map(r => r.name).includes(role))
        .map(role => {
          return { roleName: role, id };
        });


      const deleteRolePromises = deleteRole.map(role => {
        return api.delete(`/users/removeRole`, {
          headers: { Authorization: `Bearer ${keycloak.token}` },
          data: { roleName: role.roleName, id: role.id },
        });
      });

      const addRolePromises = addRole.map(role => {
        return api.post(`/users/addRole`, role, {
          headers: { Authorization: `Bearer ${keycloak.token}` },
        });
      });

      const delete_responses = await Promise.all(deleteRolePromises);
      const add_responses = await Promise.all(addRolePromises);


      setFormState({
        ...initialState,
      });
      selectUser(null);
      toast.success('Resposta enviada com sucesso!');
    }
  }

  function handleFormChange(evt) {
    const { value, name } = evt.target;

    if (name === 'enabled' && value === 'false') {
      setFormState(initialState);
    } else {
      setFormState({
        ...formState,
        [name]: value === 'true',
      });
    }
  }

  return (
    <>
      {loaded ? (
        selected ? (
          <Container>
            <Content>
              <FormCard visible>
                <Form>
                  <p>{selected.username}</p>
                  <ChoiceGroup>
                    <strong>Habilitado</strong>
                    <div>
                      <input
                        type="radio"
                        id="enabled-true"
                        name="enabled"
                        value="true"
                        onChange={handleFormChange}
                        checked={formState.enabled === true}
                      />
                      <label htmlFor="enabled-true">Sim</label>
                      <input
                        type="radio"
                        id="enabled-false"
                        name="enabled"
                        value="false"
                        checked={formState.enabled === false}
                        onChange={handleFormChange}
                      />
                      <label htmlFor="enabled-false">Não</label>
                    </div>
                  </ChoiceGroup>
                  {roles.map(role => (
                    <ChoiceGroup key={role.name}>
                      <strong>{role.name}</strong>
                      <div>
                        <input
                          type="radio"
                          id={`${role.name}-true`}
                          name={role.name}
                          value="true"
                          onChange={handleFormChange}
                          checked={formState[role.name] === true}
                        />
                        <label htmlFor={`${role.name}-true`}>Sim</label>
                        <input
                          type="radio"
                          id={`${role.name}-false`}
                          name={role.name}
                          value="false"
                          checked={formState[role.name] === false}
                          onChange={handleFormChange}
                        />
                        <label htmlFor={`${role.name}-false`}>Não</label>
                      </div>
                    </ChoiceGroup>
                  ))}

                  <FormButtonGroup>
                    <Button
                      width="13rem"
                      height="3rem"
                      backgroundColor="mountainMeadow"
                      color="white"
                      onClick={() => handleFormAnswer()}
                      // disabled={loading}
                      type="button"
                    >
                      <strong>Salvar</strong>
                    </Button>
                    <Button
                      type="button"
                      width="13rem"
                      height="3rem"
                      backgroundColor="sunset"
                      color="white"
                      onClick={() => selectUser(null)}
                      // disabled={loading}
                    >
                      <strong>Voltar</strong>
                    </Button>
                  </FormButtonGroup>
                </Form>
              </FormCard>
            </Content>
          </Container>
        ) : (
          <Container>
            <Scroll>
              <MyCard>
                <CardHeader title="Usuários" subheader={formatDate()} />
                <Table
                  columns={columns}
                  data={users}
                  components={{
                    Container: props => (
                      <CardContent>{props.children}</CardContent>
                    ),
                  }}
                  options={options}
                  actions={actions}
                  // detailPanel={detailPanel}
                />
              </MyCard>
            </Scroll>
          </Container>
        )
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
