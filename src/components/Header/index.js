import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ListSubheader, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import { useKeycloak } from '@react-keycloak/web';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IconContext } from 'react-icons';

import {
  Container,
  Profile,
  ProfileData,
  List,
  Menu,
  LogoInfo,
} from './styles';
import ProfileMenu from '~/components/ProfileMenu';
import Icon from '~/components/Icon';

import logo from '~/assets/images/header-logo.png';

export default function Header() {
  const [keycloak] = useKeycloak();
  console.info(keycloak.tokenParsed)
  const resources = keycloak.resourceAccess['isa-frontend']
    ? keycloak.resourceAccess['isa-frontend'].roles
    : [];

  const resourcesMapping = {
    diary: { name: 'Diário', to: '/diario', icon: 'diary' },
    painel: { name: 'Painel', to: '/painel', icon: 'monitoring' },
    monitoring: {
      name: 'Monitoramento',
      to: '/monitoramento',
      icon: 'monitoring',
    },
    register: { name: 'Registro', to: '/qualis', icon: 'diary' },
    'management-user': {
      name: 'Gerenciamento de Usuários',
      to: '/usuarios',
      icon: 'diary',
    },
  };

  const [open, setOpen] = useState(false);

  function handleOpenMenu() {
    setOpen(!open);
  }

  return (
    <Container>
      <Menu>
        <IconContext.Provider value={{ color: '#383A3D' }}>
          <Button onClick={handleOpenMenu}>
            <GiHamburgerMenu size="2rem" />
          </Button>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: '#17b8a7' }}>
          <Drawer anchor="left" open={open} onClose={handleOpenMenu}>
            <List>
              <ListSubheader>
                <p>Menu</p>
              </ListSubheader>
              <Divider />
              {resources.map(resource => {
                return (
                  <ListItem
                    key={resource}
                    button
                    onClick={handleOpenMenu}
                    component={NavLink}
                    activeStyle={{ fontWeight: 'bold' }}
                    to={resourcesMapping[resource].to}
                  >
                    <ListItemIcon>
                      <Icon type={resourcesMapping[resource].icon} />
                    </ListItemIcon>
                    {resourcesMapping[resource].name}
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </IconContext.Provider>
        <LogoInfo>
          <p>ISA</p>
          <p>Infection Surveillance Assistant</p>
          <img src={logo} alt="RoboISA" />
        </LogoInfo>
      </Menu>
      <Profile>
        <ProfileData>
          <strong>{keycloak.tokenParsed.given_name}</strong>
        </ProfileData>
        <ProfileMenu />
      </Profile>
    </Container>
  );
}
