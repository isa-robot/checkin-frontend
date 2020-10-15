import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  CircularProgress,
} from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/web';

import {
  Container,
  Content,
  Loading,
  FormCard,
} from './styles';

import api from '~/services/api';
import ApprovalCard from '~/components/ApprovalCard';
import { toast } from 'react-toastify';
import Collapse from '@material-ui/core/Collapse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {Link, useHistory} from 'react-router-dom';



export default function ProtocolsPending() {

  const [loading, setLoading] = useState(false);
  const [loadedProtocols, setLoadedProtocols] = useState(false);
  const [diaryAnswered, setDiaryAnswered] = useState(true);
  const [open, setOpen] = useState(true);
  const [protocolsActive, setProtocolActive] = useState(false);
  const [protocols, setProtocols] = useState({
    protocolsPendent: [],
    protocolsAnswered: []
  });
  const history = useHistory();

  const handleClickOnDate = (item) => {
   history.push(`/protocolo-cfpng?${item}`)
  };

  const handleClick = () => {
    setOpen(!open)
  };

  const [keycloak] = useKeycloak();

  async function loadPendingAndAnsweredProtocols(){
    await api.get(`/protocols/pendent-and-answered/cfpng`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(protocol => {
      setProtocols(protocol.data)
      setLoadedProtocols(true)
    }).catch(e => {
      toast.error('Houve um problema, contate o suporte!')
    })
  }

  async function loadDiaryAnswer(){

    const diary = await api.get(`/users/diaries/lastbyuser/last`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    })
    if(!diary.data.diary){
      return setDiaryAnswered(false)
    }
    setLoading(false)
  };

  function verifyProtocolsActive() {
    api.get(`/protocols/active`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then(response => {
      if(response.data.length > 0) {
        setProtocolActive(true)
      }else {
        setProtocolActive(false)
      }
    })

  }

  useEffect(() => {
    loadPendingAndAnsweredProtocols()
    loadDiaryAnswer();
    verifyProtocolsActive();
  }, []);


  return (
    <>
      {loading ? (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      ) : (
        !diaryAnswered ? (
          <Container>
            <Content>
              <ApprovalCard answered={false}></ApprovalCard>
            </Content>
          </Container>
        ) : (
                <Container>
                  <Content>
                    <FormCard visible={true} >
                      {protocolsActive ? (
                      <List style={{backgroundColor: "#F3F5FA", padding: "5px"}}>
                          <ListItem  button onClick={handleClick}>
                            <ListItemText><strong>Protocolos Pendentes</strong></ListItemText>
                            {open ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                        { !loadedProtocols ? (
                          <Loading>
                            <CircularProgress size="5rem" />
                          </Loading>
                          ) : (
                              <Collapse in={open} timeout="auto" unmountOnExit>
                                { protocols.protocolsPendent.length > 0 ? (
                                  <List>
                                    {protocols.protocolsPendent.map((item, index) => (
                                      <ListItem onClick={evt => handleClickOnDate(item)} style={{marginLeft: "10px"}} key={`protocolPendent: ${index}`} button alignItems ='center'>
                                        {item}
                                      </ListItem>
                                    ))}
                                  </List>
                                  ): <h4 style={{marginLeft: "20px"}}>Não há protocolos pendentes</h4>
                                }
                              </Collapse>
                          )}
                      </List>

                      ): <h2>Não há protocolos ativos</h2>}
                    </FormCard>

                  </Content>
                </Container>
              )
      )}
    </>
  );
}
