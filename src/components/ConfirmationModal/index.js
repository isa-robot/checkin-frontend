import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Buttons/Button';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SendText
} from './styles';
import { CircularProgress } from '@material-ui/core';

export default function Modal({
  toggle,
  toggleFunction,
  formState,
  formStateFunction,
  sending=false
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
        case 'breathLess':
          return 'Falta de ar';
        case 'breathDifficulty':
          return 'Dificuldade para respirar';
        case 'chestTightness':
          return 'Aperto no peito';
        case 'breathPressure':
          return 'pressão para respirar';
        case 'mentalConfusion':
          return 'Confusão mental';
        case 'dizziness':
          return 'Tonturas';
        case 'draggedVoice':
          return 'Voz arrastada';
        case 'awakeDifficulty':
          return 'Dificuldade para se manter acordado';
        case 'blueSkin':
          return 'Lábios ou face com coloração mais azulada';
        case 'lowPressure':
          return 'pressão baixa';
        case 'pallor':
          return 'palidez';
        case 'sweating':
          return 'sudorese';
        case 'oximetry':
          return 'Fez oximetria';
        case 'extraSymptom':
          return 'Você apresentou algum sintoma a mais';
        case 'hadContactWithInfected':
          return 'Teve contato com alguém infectado';
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
              list.map((val, index) => (
                <li key={index}>
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
          <div style={{position: "relative"}}>
            <Button
              type="button"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
              onClick={() => formStateFunction()}
              disabled={sending}
            >
              <SendText visible={sending == false}>Enviar</SendText>
              <SendText visible={sending == true}>enviando</SendText>
            </Button>
            { sending ? (
              <div style={{ position: "absolute", top: "20%", left: "40%" }}>
                <CircularProgress size="2rem"/>
              </div>
              ) : ""
            }
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
