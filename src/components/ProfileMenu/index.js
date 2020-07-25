import React, { useState, useEffect, useRef } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { kcSignOut } from '~/store/modules/auth/actions';

import { Container, Badge, DropDown } from './styles';

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.user.profile);
  const [keycloak] = useKeycloak();

  const history = useHistory();
  const dropRef = useRef(null);
  const [menuDropdown, setMenuDropDown] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuDropDown(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  function handleLogout() {
    history.push('/');
    dispatch(kcSignOut());
  }

  function handleProfile() {
    setMenuDropDown(!menuDropdown);
    keycloak.accountManagement();
  }

  function handleSetup() {
    setMenuDropDown(!menuDropdown);
    history.push('/configuracao');
  }

  function handleToggleMenuDropdown() {
    setMenuDropDown(!menuDropdown);
  }

  useOutsideAlerter(dropRef);

  return (
    <Container ref={dropRef}>
      <Badge onClick={handleToggleMenuDropdown}>
        <FaRegUserCircle size="1.8rem" />
      </Badge>
      <DropDown visible={menuDropdown}>
        <button type="button" onClick={handleProfile}>
          <p>Perfil</p>
        </button>
        {roles.includes('admin') ? (
          <button type="button" onClick={handleSetup}>
            <p>Configuração</p>
          </button>
        ) : null}

        <button type="button" onClick={handleLogout}>
          <p>Sair</p>
        </button>
      </DropDown>
    </Container>
  );
}
