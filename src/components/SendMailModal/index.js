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
import api from '~/services/api';
import { useKeycloak } from '@react-keycloak/web';
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SendMailModal({
                                        toggle,
                                        toggleFunction,
                                        protocolName,
                                        protocolGenerationDate
                                      }) {
  const ref = useRef();
  const [display, setDisplay] = useState(toggle);
  const [list, setList] = useState([]);
  const [textMail, setTextMail] = useState("")
  const [keycloak] = useKeycloak();
  const history = useHistory();

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleOnClick() {
    toggleFunction(String(false));
  }

  async function handleSendMail() {
    await api.post(`/send-mail/toHealthService/${protocolName}`, {textMail, protocolGenerationDate}, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(() => {

      toast.success("Email enviado com sucesso")
    })
  }
  return (
    <Container ref={ref} display={String(display)} onClick={handleOnClick}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <strong>Enviar email para o serviço de infectologia?</strong>
        </ModalHeader>
        <ModalBody>
          <textarea value={textMail} onChange={e => setTextMail(e.target.value)} style={{minWidth: "330px", width: "330px",maxWidth: "330px", height: "230px", minHeight: "230px", maxHeight: "230px"}} placeholder="Sua mensagem..." />;
        </ModalBody>
        <ModalFooter>
          <div style={{display: "flex", flexDirection: "column"}}>
            <Button
              type="button"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
              onClick={() => handleSendMail()}
            >
              <p>Enviar</p>
            </Button>
            <Button
              style={{marginTop: "10px", backgroundColor: "#e11400aa"}}
              type="button"
              color="white"
              width="150px"
              height="50px"
              onClick={handleOnClick}
            >
              <p>Não Enviar</p>
            </Button>
          </div>
        </ModalFooter>
      </ModalCard>
    </Container>
  );
}

SendMailModal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
};

SendMailModal.defaultProps = {
  toggle: false,
};
