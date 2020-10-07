import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
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
  const [diaryAnswered, setDiaryAnswered] = useState(true);
  const [dateDiary, setDateDiary] = useState(new Date());
  const [open, setOpen] = useState(true);
  const [protocols, setProtocols] = useState({
    protocolsPendent: [],
    protocolsAnswered: []
  });
  const history = useHistory();

  const handleClickOnDate = (item) => {
   history.push(`/protocolo-cfpng?date=${item}`)
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

  useEffect(() => {
    loadPendingAndAnsweredProtocols()
    loadDiaryAnswer();
  }, []);


  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        !diaryAnswered ? (
          <Container>
            <Content>
              <ApprovalCard answered={false} date={dateDiary}></ApprovalCard>
            </Content>
          </Container>
        ):
              (
                <Container>
                  <Content>
                    <FormCard visible={true} >
                      <List style={{backgroundColor: "#F3F5FA", padding: "5px"}}>
                          <ListItem  button onClick={handleClick}>
                            <ListItemText><strong>Protocolos Pendentes</strong></ListItemText>
                            {open ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <List>
                              {protocols.protocolsPendent.map((item, index) => (
                                <ListItem onClick={evt => handleClickOnDate(item)} style={{marginLeft: "10px"}} key={`protocolPendent: ${index}`} button alignItems ='center'>
                                  {item}
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                      </List>
                    </FormCard>

                  </Content>
                </Container>
              )
      )}
    </>
  );
}
