import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Buttons/Button';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ErrorText
} from './styles';
import api from '~/services/api';
import { useKeycloak } from '@react-keycloak/web';
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import { SendText } from '~/components/ConfirmationModal/styles';
import { CircularProgress } from '@material-ui/core';

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
  const [sending, setSending] = useState(false);
  const [textError, setTextError] = useState(false)

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleOnClick() {
    toggleFunction(String(false));
  }

  async function handleSendMail() {
    setSending(true)

    if(textMail.length < 1) {
      setSending(false)
      return setTextError(true)
    }

    await api.post(`/send-mail/toHealthService/${protocolName}`, {textMail, protocolGenerationDate}, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(() => {
      handleOnClick()
      toast.success("Email enviado com sucesso")
      setSending(false)
    }).catch(e => {
      setSending(false)
      toast.error("Houve um problema, contate o suporte!")
    })
  }
  return (
    <Container ref={ref} display={String(display)} onClick={handleOnClick}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <strong>Diga mais detalhes de como você está se sentindo. Estas informações serão encaminhadas ao serviço de saúde.</strong>
        </ModalHeader>
        <ModalBody>
          <ErrorText style={{color: "#e11400aa"}} textError={textError}>Para enviar, você precisa preencher a caixa de texto</ErrorText>
          <textarea value={textMail} onChange={e => {
            setTextMail(e.target.value)
            if(textMail > 0 && textError) {
              setTextError(false)
            }
          }} style={{padding: "10px",
            borderRadius: "5px",
            minWidth: "330px", width: "330px",maxWidth: "330px", height: "230px",
            minHeight: "230px", maxHeight: "230px"}}
                    placeholder="Sua mensagem..."
          />;
        </ModalBody>
        <ModalFooter>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{position: "relative"}}>
              <Button
                type="button"
                color="white"
                backgroundColor="mountainMeadow"
                width="150px"
                height="50px"
                onClick={() => handleSendMail()}
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
