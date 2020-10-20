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
  SelectDiv,
} from './styles';
import Button from '~/components/Buttons/Button';

import Table from '~/components/Table';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import { MTableToolbar } from 'material-table';
import { debounce } from 'rxjs/operators';

export default function Users() {
  const [loaded, setLoaded] = useState(false);
  const [keycloak] = useKeycloak();
  const [users, setUsers] = useState([]);
  const [maxUsers, setMaxUsers] = useState(0)
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0)
  const [enabled, setEnabled] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [selected, selectUser] = useState(null);
  const [newRole, setNewRole] = useState('desabilitado');

  const handleManageUser = user => {
    const role = user.roles.length ? user.roles[0].name : 'desabilitado';
    if (user.roles.length) setEnabled(true);
    else setEnabled(false);
    setNewRole(role);
    selectUser(user);
  };

  const options = {
    filtering: false,
    grouping: false,
    actionsColumnIndex: -1,
    pageSize: maxUsers >= 20 ? 20 : maxUsers,
    pageSizeOptions: []
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
      field: 'roles',
      title: 'Roles',
      render: rowData => rowData.roles.map(role => translateRoles(role.name)).join(', '),
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

  async function listUsers() {
    const response = await api.get('users', {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    });

    if (response.data) setUsers(response.data);
    setLoaded(true);
  }
  async function countUsers() {
    const response = await api.get('users/countUsers', {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    }).then(maxUsers => {
      setMaxUsers(maxUsers.data)
    });
    setLoaded(true);
  }

  useEffect(() => {

    listUsers();
    countUsers();
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
    if (enabled === true && newRole === 'desabilitado') {
      toast.error('Você precisa selecionar um perfil!');
    } else {
      const { id } = selected.user;
      const userRoles = selected.roles;

      const deleteRole = userRoles.map(role => {
        return { roleName: role.name, id };
      });

      const deleteRolePromises = deleteRole.map(role => {
        return api.delete(`/users/removeRole`, {
          headers: { Authorization: `Bearer ${keycloak.token}` },
          data: { roleName: role.roleName, id: role.id },
        });
      });

      if (enabled === true) {
        const role = { roleName: newRole, id };

        await api.post(`/users/addRole`, role, {
          headers: { Authorization: `Bearer ${keycloak.token}` },
        });
      }

      await Promise.all(deleteRolePromises);

      selectUser(null);
      setLoaded(false);
      setNewRole('desabilitado');
      toast.success('Perfil modificado com sucesso!');
    }
  }

  function handleSearch(e) {
    setPage(0)
    const deb = debounce(() => {
      api.get(`users/searchName/${e}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` }
      }).then(users => {
          setUsers(users.data)
        })
    }, 300)
    deb()
  }

  function handlePagination(page= 1) {
    api.get(`users/paginated/${page+1}`, {
      headers: { Authorization: `Bearer ${keycloak.token}` }
    }).then(users => {
      setUsers(users.data)
    })
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  function handleChangeEnabled(evt) {
    const { value } = evt.target;
    if (value === 'false') setNewRole('desabilitado');
    setEnabled(value === 'true');
  }

  const handleChangeRole = evt => {
    const { value } = evt.target;
    setNewRole(value);
  };

  const translateRoles = (roleName) => {
    return roleName === 'admin' ? 'administrador' :
      roleName === 'infectologist' ? 'infectologista' :
        roleName === 'responsible' ? 'responsável' :
          roleName === 'assisted' ? 'assistido' : ''
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
                        onChange={handleChangeEnabled}
                        checked={enabled === true}
                      />
                      <label htmlFor="enabled-true">Sim</label>
                      <input
                        type="radio"
                        id="enabled-false"
                        name="enabled"
                        value="false"
                        checked={enabled === false}
                        onChange={handleChangeEnabled}
                      />
                      <label htmlFor="enabled-false">Não</label>
                    </div>
                  </ChoiceGroup>
                  <SelectDiv>
                    <select
                      required
                      name="race"
                      defaultValue={newRole}
                      value={newRole}
                      disabled={enabled === false}
                      onChange={handleChangeRole}
                    >
                      <option disabled value="desabilitado">
                        Escolha um perfil
                      </option>
                      {roles.map(role => (
                        <option key={role.name} value={role.name}>
                          {translateRoles(role.name)}
                        </option>
                      ))}
                    </select>
                    <label>Perfil</label>
                  </SelectDiv>
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
                    Pagination: props => (
                      <TablePagination
                        {...props}
                        count={20}
                        page={page}
                        onChangePage={(e, page) => handlePagination(page)}
                      />
                    )

                  }}
                  handleSearchChange={(e) => handleSearch(e)}
                  options={options}
                  actions={actions}
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
