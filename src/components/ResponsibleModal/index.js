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
import { newResponsibleRequest } from '~/store/modules/user/actions';

export default function ResponsibleModal({ toggle, toggleFunction }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(toggle);
  const { register, handleSubmit, errors } = useForm();

  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleAnswer(data) {
    data.cpf = data.cpf.toString();
    data.rg = data.rg.toString();
    dispatch(newResponsibleRequest(data));
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
                name="email"
                type="text"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}

              />
              <label>Email do Responsável</label>
            </InputDiv>
            {errors.email && errors.email.type === 'required' && (
              <span>O campo email é obrigatório</span>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <span>Email inválido</span>
            )}
            <InputDiv>
              <input
                name="address"
                type="text"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Endereço do Responsável</label>
            </InputDiv>
            {errors.adress && errors.adress.type === 'required' && (
              <span>O campo endereço é obrigatório</span>
            )}
            <InputDiv>
              <input
                name="cpf"
                type="number"
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
                name="rg"
                type="number"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>RG do Responsável</label>
            </InputDiv>
            {errors.rg && errors.rg.type === 'required' && (
              <span>O campo RG é obrigatório</span>
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

ResponsibleModal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
};

ResponsibleModal.defaultProps = {
  toggle: false,
};

