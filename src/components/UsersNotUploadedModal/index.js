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
  data,
  sending=false
}) {
  const ref = useRef();
  const [display, setDisplay] = useState(toggle);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleOnClick() {
    toggleFunction(String(false));
  }

  return (
    <Container ref={ref} display={String(display)} onClick={handleOnClick}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <strong>Os seguintes usuários não foram registrados: </strong>
        </ModalHeader>
        <ModalBody>
          <ul>
            {
              data.map((val, index) => (
                <li key={index}>
                  <p>{val.firstName} {val.lastName} - {val.email}</p>
                </li>
              ))
            }
          </ul>
        </ModalBody>
        <ModalFooter>
          <div style={{position: "relative"}}>
            <Button
              type="button"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
              onClick={() => setDisplay(false)}
              disabled={sending}
            >
              ok
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
};

Modal.defaultProps = {
  toggle: false,
};
