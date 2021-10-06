import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CachedIcon from '@material-ui/icons/Cached';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styles';

import { kcSignOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import { useKeycloak } from '@react-keycloak/web';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

export default function Modal({ toggle }) {
  const [display, setDisplay] = useState(toggle);
  const dispatch = useDispatch();
  const history = useHistory();
  const [documentSent, setDocumentSent] = useState(false);
  const [signatureVerified, setSignatureVerified] = useState(true);
  const [keycloak] = useKeycloak();

  function resendEmail () {
    api.post(`/signature/send-solicitation`, {}, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(response => {
      toast.success('E-mail reenviado!');
    }).catch(error => {
      toast.error('Houve um problema, contate o suporte!');
    });
  }

  function documentSigner(){
    api.post(`/signature/document-signer`, { "docType": "WEB" }, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).catch(error => {
      setSignatureVerified(false);
    });
  }

  function signVerify(){
    api.get(`/signature/by-user`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(response => {
      if(!response.data){
        documentSigner();
        setDocumentSent(false);
        setSignatureVerified(false);
      }else if(response.data.signed === true){
        setDocumentSent(true);
        setSignatureVerified (true);
      }else{
        setDocumentSent(true);
        setSignatureVerified (false);
      }
    }).catch(error => {
      setSignatureVerified(false);
      toast.error('Houve um problema, contate o suporte!');
    })
  }

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  useEffect(() => {
    signVerify();
  }, []);

  const handleModalClick = () => {
    history.push('/');
    dispatch(kcSignOut());
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return !signatureVerified && <Container  display={String(display)}>
    <ModalCard>
      <ModalHeader>
        <h1>Termo enviado por e-mail</h1>
      </ModalHeader>
      <ModalBody>
        <p>Seu acesso será liberado assim que o termo for assinado</p>
        <Button style={{marginTop:8, marginBottom:8}} variant='text' onClick={resendEmail}>
          <SendIcon style={{marginRight:16}}></SendIcon>
          Reenviar termo por e-mail
        </Button>
      </ModalBody>
      <ModalFooter>
          <Button variant='outlined' onClick={reloadPage}>
            <CachedIcon style={{marginRight:16}}></CachedIcon>
            Atualizar Pagina
          </Button>
          <Button variant='contained' style={{background:'#e11400aa', color:'#fff'}} onClick={handleModalClick}>
            <ExitToAppIcon style={{marginRight:16}}></ExitToAppIcon>
            Sair
          </Button>
      </ModalFooter>
    </ModalCard>
  </Container>
}

Modal.propTypes = {
  toggle: PropTypes.bool,
};

Modal.defaultProps = {
  toggle: false,
};
