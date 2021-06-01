import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AiOutlineMinusCircle } from 'react-icons/ai';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styles';

import { kcSignOut } from '~/store/modules/auth/actions';

export default function Modal({ toggle }) {
  const [display, setDisplay] = useState(toggle);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  const handleModalClick = () => {
    history.push('/');
    dispatch(kcSignOut());
  };

  return (
    <Container display={String(display)} onClick={handleModalClick}>
      <ModalCard>
        <ModalHeader>
          <h1>NÃO HABILITADO</h1>
        </ModalHeader>
        <ModalBody>
          <AiOutlineMinusCircle color="#000" size="10rem" />
        </ModalBody>
        <ModalFooter>
          <p>Aguarde sua aprovação para usar o sistema</p>
        </ModalFooter>
      </ModalCard>
    </Container>
  );
}

Modal.propTypes = {
  toggle: PropTypes.bool,
};

Modal.defaultProps = {
  toggle: false,
};
