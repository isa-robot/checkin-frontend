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
  SelectDiv,
} from './styles';
import { newStudentBaselineRequest } from '~/store/modules/user/actions';

export default function Modal({ toggle, toggleFunction }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(toggle);
  const { register, handleSubmit, errors } = useForm();

  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleAnswer(data) {
      dispatch(newStudentBaselineRequest(data));
      toggleFunction(Boolean(loading));
  }


  return (
      <Container ref={ref} display={String(display)}>
        <form onSubmit={handleSubmit(handleAnswer)} autoComplete="off" noValidate>
          <ModalCard>
            <ModalHeader>
              <strong>
                Insira abaixo seus dados de perfil e histórico médico
              </strong>
            </ModalHeader>
            <ModalBody>
              <InputDiv>
                <input
                  name="age"
                  type="number"
                  autoComplete="off"
                  placeholder="-"
                  maxLength="2"
                  ref={register({ required: true, pattern: /^[0-9]*$/ })}
                />
                <label>Idade (anos)</label>
              </InputDiv>
              {errors.age && errors.age.type === 'required' && (
                <span>O campo idade é obrigatório</span>
              )}
              {errors.age && errors.age.type === 'pattern' && (
                <span>O campo deve conter somente números</span>
              )}
              <SelectDiv>
                <select
                  required
                  name="genre"
                  defaultValue=""
                  ref={register({ required: true })}
                >
                  <option disabled hidden />
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
                <label>Sexo</label>
              </SelectDiv>
              {errors.genre && <span>O campo sexo é obrigatório</span>}
              <SelectDiv>
                <select
                  required
                  name="grade"
                  defaultValue=""
                  ref={register({ required: true })}
                >
                  <option disabled hidden />
                  <option value="Primeira serie">1ª série</option>
                  <option value="Segunda serie">2ª série</option>
                  <option value="Terceira serie">3ª série</option>
                  <option value="Quarta serie">4ª série</option>
                  <option value="Quinta serie">5ª série</option>
                  <option value="Sexta serie">6ª série</option>
                  <option value="Setima serie">7ª série</option>
                  <option value="Oitava serie">8ª série</option>
                  <option value="Nona serie">9ª série</option>
                  <option value="Primeiro ano">1º ano</option>
                  <option value="Segundo ano">2º ano</option>
                  <option value="Terceiro ano">3º ano</option>
                </select>
                <label>Grau de escolaridade</label>
              </SelectDiv>
              {errors.grade && <span>O campo grau de escolaridade é obrigatório</span>}
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

Modal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  toggle: false,
};

