import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Buttons/Button';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styles';

export default function Modal({
  toggle,
  toggleFunction,
  formState,
  formStateFunction,
}) {
  const ref = useRef();
  const [display, setDisplay] = useState(toggle);
  const [list, setList] = useState([]);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  useEffect(() => {
    const values = [];

    Object.keys(formState).map(key => {
      if (formState[key]) {
        values.push(key);
      }
    });

    const newValues = values.map(val => {
      switch (val) {
        case 'smellLoss':
          return 'Perda do Olfato';
        case 'tasteLoss':
          return 'Perda do Paladar';
        case 'appetiteLoss':
          return 'Perda de Apetite';
        case 'fatigue':
          return 'Cansaço';
        case 'fever':
          return 'Febre';
        case 'cough':
          return 'Tosse Persistente';
        case 'diarrhea':
          return 'Diarréia';
        case 'delirium':
          return 'Delírios';
        case 'soreThroat':
          return 'Dor de Garganta';
        case 'shortnessOfBreath':
          return 'Falta de Ar';
        case 'abdominalPain':
          return 'Dor Abdominal';
        case 'chestPain':
          return 'Dor no Peito';
        default:
          return '';
      }
    });

    setList(newValues);
  }, [formState]);

  function handleOnClick() {
    toggleFunction(String(false));
  }

  return (
    <Container ref={ref} display={String(display)} onClick={handleOnClick}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <strong>Você confirma o envio dos sintomas abaixo?</strong>
        </ModalHeader>
        <ModalBody>
          <ul>
            {list.length !== 0 ? (
              list.map(val => (
                <li key={val}>
                  <p>{val}</p>
                </li>
              ))
            ) : (
              <p>Não há sintomas marcados, tudo bem com você então?</p>
            )}
          </ul>
        </ModalBody>
        <ModalFooter>
          <strong>Essa ação não pode ser desfeita!</strong>
          <div>
            <Button
              type="button"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
              onClick={() => formStateFunction()}
            >
              <p>Enviar</p>
            </Button>
          </div>
        </ModalFooter>
      </ModalCard>
    </Container>
  );
}

Modal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  formStateFunction: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  toggle: false,
};
