import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Buttons/Button';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputDiv,
} from './styles';
import { newBaselineRequest } from '~/store/modules/user/actions';

export default function ParentModal({ toggle, toggleFunction }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(toggle);
  const { register, handleSubmit, errors } = useForm();

  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleAnswer(data) {
    dispatch(newBaselineRequest(data));
    toggleFunction(Boolean(loading));
  }


  return (
    <Container ref={ref} display={String(display)}>
      <form onSubmit={handleSubmit(handleAnswer)} autoComplete="off" noValidate>
        <ModalCard>
          <ModalHeader>
            <strong>
              Insira abaixo os dados do responsável
            </strong>
          </ModalHeader>
          <ModalBody>
            <InputDiv>
              <input
                name="name"
                type="text"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Nome do Responsável</label>
            </InputDiv>
            {errors.name && errors.name.type === 'required' && (
              <span>O campo nome é obrigatório</span>
            )}
            <InputDiv>
              <input
                name="cpf"
                type="number"
                minLength={10}
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>CPF do Responsável</label>
            </InputDiv>
            {errors.cpf && errors.cpf.type === 'required' && (
              <span>O campo CPF é obrigatório</span>
            )}
            <InputDiv>
              <input
                name="email"
                type="text"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Email do Responsável</label>
            </InputDiv>
            {errors.email && errors.email.type === 'required' && (
              <span>O campo email é obrigatório</span>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
            >
              <p> {loading ? 'Enviando...' : 'Enviar'}</p>
            </Button>
          </ModalFooter>
        </ModalCard>
      </form>
    </Container>
  );
}

ParentModal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
};

ParentModal.defaultProps = {
  toggle: false,
};

