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

  const resendEmail = () => {
    resendEmail();
  }


  return (
    <Container display={String(display)}>
      <ModalCard>
        <ModalHeader>
          <h1>Desculpe</h1>
        </ModalHeader>
        <ModalBody>
          <p>Parece que o termo encaminhado para o seu e-mail ainda não foi assinado!</p>
        </ModalBody>
        <ModalFooter>
          <p>Gostaria de recebê-lo novamente?</p>
        </ModalFooter>
        <button onClick={resendEmail}>Reenviar e-mail</button>
        <button onClick={handleModalClick}>Sair</button>
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
