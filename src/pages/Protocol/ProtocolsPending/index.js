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



export default function ProtocolsPending() {

  const [loading, setLoading] = useState(false);
  const [diaryAnswered, setDiaryAnswered] = useState(true);
  const [dateDiary, setDateDiary] = useState(new Date());




  const protocols = ({
    protocolsPendent: [
      "01/10/2020",
      "02/10/2020"
    ],
    protocolsAnswered: [
      "30/09/2020"
    ]
  });

  const handleClick = () => {
  };


  const [keycloak] = useKeycloak();


 async function loadPendingAndAnsweredProtocols(){
   const cfpngProtocolsDates = await api.get(`/protocols/pendent-and-answered/cfpng`, {
     headers: {
       Authorization: `Bearer ${keycloak.token}`
     }
   })
    console.log(cfpngProtocolsDates);
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

                      <List style={{width:'100%'}}>
                          <ListItemText>Protocolos Pendentes</ListItemText>
                          {protocols.protocolsPendent.map((item) => (
                            <ListItem button alignItems ='center'>
                              {item}
                            </ListItem>
                          ))}
                      </List>


                    </FormCard>

                  </Content>
                </Container>
              )
      )}
    </>
  );
}
