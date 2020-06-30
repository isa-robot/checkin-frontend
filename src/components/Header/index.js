import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ListSubheader, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

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
  const { name, establishments } = useSelector(state => state.user.profile);
  const { resources } = useSelector(state => state.user.profile.role);

  let establishment = '';
  if (establishments.length > 0) {
    establishment = establishments[0].name;
  }

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
                    key={resource.id}
                    button
                    onClick={handleOpenMenu}
                    component={NavLink}
                    activeStyle={{ fontWeight: 'bold' }}
                    to={resource.to}
                  >
                    <ListItemIcon>
                      <Icon type={resource.icon} />
                    </ListItemIcon>
                    {resource.name}
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
          <strong>{name}</strong>
          <span>{establishment}</span>
        </ProfileData>
        <ProfileMenu />
      </Profile>
    </Container>
  );
}
