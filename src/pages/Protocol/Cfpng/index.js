import React, { useState, useEffect } from 'react';
import {
  TextField,
  Checkbox,
  withStyles, CircularProgress,
} from '@material-ui/core';

import { Form } from '@rocketseat/unform';
import { useKeycloak } from '@react-keycloak/web';

import {
  Container,
  Content,
  Loading,
  FormCard,
  FormButtonGroup,
  ChoiceGroup,
  InputGroup,
} from './styles';


import { format, formatISO } from 'date-fns';
import api from '~/services/api';
import Button from '~/components/Buttons/Button';
import ProtocolCard from '~/components/ProtocolCard';
import Modal from '~/components/ConfirmationModal';
import ApprovalCard from '~/components/ApprovalCard';
import { toast } from 'react-toastify';
import { LinearProgress } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import SendMailModal from '~/components/SendMailModal';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#17b8a7"
  },
}))(LinearProgress);

export const GreenCheckbox = withStyles({
  root: {
    color: "#17b8a7",
    '&$checked': {
      color: "#17b8a7",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function
  Cfpng() {
  const initialState = {
    breathLess: false,
    breathDifficulty: false,
    chestTightness: false,
    breathPressure: false,
    mentalConfusion: false,
    dizziness: false,
    draggedVoice: false,
    awakeDifficulty: false,
    blueSkin: false,
    lowPressure: false,
    pallor: false,
    sweating: false,
    oximetry: false,
    extraSymptom: false,
    protocolGenerationDate: "",
    newSymptom: ""
  };

  const [loading, setLoading] = useState(false);
  const [period, ] = useState(14)
  const [form, setForm] = useState(false);
  const [protocolAnswered, setProtocolAnswered] = useState(false);
  const [diaryAnswered, setDiaryAnswered] = useState(true);
  const [approved, setApproved] = useState(true);
  const [formSent, setFormSent] = useState(false)
  const [dateDiary, setDateDiary] = useState(new Date());
  const [newSympt, setNewSympt] = useState("")
  const [dateExp, setDateExp] = useState(false);
  const [protocolDate, setProtocolDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [clearAndSend, setClearAndSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [protocolMailDate, setProtocolMailDate] = useState(false)
  const [progress, setProgress] = useState(0)
  const [toggleSendMail, setToggleSendMail] = useState(100)
  const [protocols, setProtocols] = useState({
    protocolsPendent: [],
    protocolsAnswered: []
  });
  const urlQueryDivider = window.location.search.substring(1).split('&');
  const history = useHistory()

  const [keycloak] = useKeycloak();

  function toggleModal(prop) {
    setToggle(prop);
  }
  function toggleSendMailModal(prop) {
    setToggleSendMail(prop)
  }

  async function handleFormAnswer() {
    setSending(true)
    formState.newSymptom = newSympt

    const date = new Date(urlQueryDivider[0].split("/").reverse().join("/"))
    formState.protocolGenerationDate = formatISO(date,
      { representation: 'date' })
    api
      .post(`/protocols/cfpng`, formState, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(response => {
        toast.success('Resposta enviada com sucesso!');
        setToggle(false)
        setApproved(response.data.cfpng.approved);
        setFormSent(true)
        setProtocolDate(new Date(urlQueryDivider[0].split("/").reverse().join("/")));
        setProtocolAnswered(true);
        toggleSendMailModal(true)
        setSending(false)
      })
      .catch((e) => {
        setSending(false)
        toast.error('Houve um problema, contate o suporte!')
      });
    setLoading(false);
  }

  function handleFormChange(evt) {
    const { value, name } = evt.target;
    setFormState({
      ...formState,
      [name]: value === 'true',
    });
  }

  function handleToggleForm() {
    setForm(!form);
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
  }

  async function getProtocolsAnsweredPendent() {
    return await api.get(`/protocols/pendent-and-answered/cfpng`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    })
  }

  async function getProtocolMailDates() {
    return await api.get(`/protocols/active-mail-date/cfpng`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    })
  }

  async function loadAnsweredProtocols() {
    getProtocolsAnsweredPendent()
      .then(protocol => {
        setProtocols(protocol.data)
        determinateLinearProgress(protocol.data)
      })
  }

  async function determinateLinearProgress(protocol) {
    setProgress(( protocol.protocolsAnswered.length / period ) * 100)

  }

  async function verifyProtocolMailDatesModal() {
    const protocolDate = urlQueryDivider[0]
    getProtocolMailDates()
      .then(protocolMailDates => {
        const protocolMailDateExists = protocolMailDates.data.protocolMailDate.filter(protocolMail => {
          return protocolMail == protocolDate
        })
        if(protocolMailDateExists.length > 0) {
          setProtocolMailDate(true)
        }
      })
  }

  async function verifyProtocolDateExistance() {
    const protocolDate = urlQueryDivider[0]
    getProtocolsAnsweredPendent()
      .then(protocol => {
        const protocolAnsweredDateExist = protocol.data.protocolsAnswered.filter(protocolAnswered => {
          return protocolDate == protocolAnswered
        })

        if(protocolAnsweredDateExist.length > 0) {
          setProtocolDate(new Date(urlQueryDivider[0].split("/").reverse().join("/")));
          return setProtocolAnswered(true);
        }

        const protocolPendentDateExist = protocol.data.protocolsPendent.filter(protocolPendent => {
          return protocolDate == protocolPendent
        })
        if(protocolPendentDateExist.length < 1) {
          history.push("/avaliacoes")
        }
      })
  }

  useEffect(() => {
    if(!urlQueryDivider[0]) {
      history.push("/avaliacoes")
    }
    loadDiaryAnswer()
    loadAnsweredProtocols()
    verifyProtocolMailDatesModal()
    verifyProtocolDateExistance()
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
              <ApprovalCard answered={false} date={dateDiary}></ApprovalCard>
            </Content>
          </Container>
        ) : (
        dateExp ? (
          <Container>
            <Content>
              <ApprovalCard dateExpired={true} date={new Date()}></ApprovalCard>
            </Content>
          </Container>
          ) :
        protocolAnswered ? (
          <Container>
            <Content>
              <ProtocolCard approved={approved} date={protocolDate} />
            </Content>
            {
              !approved || (SendMailModal && approved && formSent) ? (
                <SendMailModal
                  toggle={toggleSendMail}
                  toggleFunction={toggleSendMailModal}
                  protocolName={"cfpng"}
                  protocolGenerationDate={urlQueryDivider[0]}
                />
              ) : ""
            }
          </Container>
          ) : (
          <Container>
            <Content>
              <FormCard visible={true}>
                <div>
                  <p>{protocols.protocolsAnswered.length} de {period} avaliacões respondidas</p>
                  <BorderLinearProgress variant="determinate" value={progress}/>
                </div>
                <span style={{marginTop: "15px"}}></span>
                <h4>avaliação do dia: {urlQueryDivider[0]}</h4>
                <h3>Você está apresentando algum destes sintomas?</h3>
                <Form>
                  <InputGroup>
                    <ChoiceGroup key={1} visible={true}>
                      <p>Falta de ar</p>
                      <div>
                        <GreenCheckbox checked={formState.breathLess}
                                             onChange={handleFormChange}
                                             id="breathLess-true"
                                             name="breathLess"
                                             value={true}/>
                        <label htmlFor="breathLess-true">Sim</label>
                        <GreenCheckbox checked={!formState.breathLess}
                                  onChange={handleFormChange}
                                  id="breathLess-false"
                                  name="breathLess"
                                  value={false}/>
                        <label htmlFor="breathLess-false">Não</label>
                      </div>
                    </ChoiceGroup >
                    <ChoiceGroup key={2} visible={true}>
                      <p>Dificuldade para respirar</p>
                      <div>
                        <GreenCheckbox checked={formState.breathDifficulty}
                                  onChange={handleFormChange}
                                  id="breathDifficulty-true"
                                  name="breathDifficulty"
                                  value={true}/>
                        <label htmlFor="breathDifficulty-true">Sim</label>
                        <GreenCheckbox checked={!formState.breathDifficulty}
                                  onChange={handleFormChange}
                                  id="breathDifficulty-false"
                                  name="breathDifficulty"
                                  value={false}/>
                        <label htmlFor="breathDifficulty-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={3} visible={true}>
                      <p>Aperto no peito</p>
                      <div>
                        <GreenCheckbox checked={formState.chestTightness}
                                  onChange={handleFormChange}
                                  id="chestTightness-true"
                                  name="chestTightness"
                                  value={true}/>
                        <label htmlFor="chestTightness-true">Sim</label>
                        <GreenCheckbox checked={!formState.chestTightness}
                                  onChange={handleFormChange}
                                  id="chestTightness-false"
                                  name="chestTightness"
                                  value={false}/>
                        <label htmlFor="chestTightness-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={4} visible={true}>
                      <p>Pressão para respirar</p>
                      <div>
                        <GreenCheckbox checked={formState.breathPressure}
                                       onChange={handleFormChange}
                                       id="breathPressure-true"
                                       name="breathPressure"
                                       value={true}/>
                        <label htmlFor="breathPressure-true">Sim</label>
                        <GreenCheckbox checked={!formState.breathPressure}
                                       onChange={handleFormChange}
                                       id="breathPressure-false"
                                       name="breathPressure"
                                       value={false}/>
                        <label htmlFor="breathPressure-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={5} visible={true}>
                      <p>Confusão mental</p>
                      <div>
                        <GreenCheckbox checked={formState.mentalConfusion}
                                       onChange={handleFormChange}
                                       id="mentalConfusion-true"
                                       name="mentalConfusion"
                                       value={true}/>
                        <label htmlFor="mentalConfusion-true">Sim</label>
                        <GreenCheckbox checked={!formState.mentalConfusion}
                                       onChange={handleFormChange}
                                       id="mentalConfusion-false"
                                       name="mentalConfusion"
                                       value={false}/>
                        <label htmlFor="mentalConfusion-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={6} visible={true}>
                      <p>Tonturas</p>
                      <div>
                        <GreenCheckbox checked={formState.dizziness}
                                       onChange={handleFormChange}
                                       id="dizziness-true"
                                       name="dizziness"
                                       value={true}/>
                        <label htmlFor="dizziness-true">Sim</label>
                        <GreenCheckbox checked={!formState.dizziness}
                                       onChange={handleFormChange}
                                       id="dizziness-false"
                                       name="dizziness"
                                       value={false}/>
                        <label htmlFor="dizziness-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={7} visible={true}>
                      <p>Voz arrastada</p>
                      <div>
                        <GreenCheckbox checked={formState.draggedVoice}
                                       onChange={handleFormChange}
                                       id="draggedVoice-true"
                                       name="draggedVoice"
                                       value={true}/>
                        <label htmlFor="draggedVoice-true">Sim</label>
                        <GreenCheckbox checked={!formState.draggedVoice}
                                       onChange={handleFormChange}
                                       id="draggedVoice-false"
                                       name="draggedVoice"
                                       value={false}/>
                        <label htmlFor="draggedVoice-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={8} visible={true}>
                      <p>Dificuldade para se manter acordado</p>
                      <div>
                        <GreenCheckbox checked={formState.awakeDifficulty}
                                       onChange={handleFormChange}
                                       id="awakeDifficulty-true"
                                       name="awakeDifficulty"
                                       value={true}/>
                        <label htmlFor="awakeDifficulty-true">Sim</label>
                        <GreenCheckbox checked={!formState.awakeDifficulty}
                                       onChange={handleFormChange}
                                       id="awakeDifficulty-false"
                                       name="awakeDifficulty"
                                       value={false}/>
                        <label htmlFor="awakeDifficulty-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={10} visible={true}>
                      <p>Pressão baixa</p>
                      <div>
                        <GreenCheckbox checked={formState.lowPressure}
                                       onChange={handleFormChange}
                                       id="lowPressure-true"
                                       name="lowPressure"
                                       value={true}/>
                        <label htmlFor="lowPressure-true">Sim</label>
                        <GreenCheckbox checked={!formState.lowPressure}
                                       onChange={handleFormChange}
                                       id="lowPressure-false"
                                       name="lowPressure"
                                       value={false}/>
                        <label htmlFor="lowPressure-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={11} visible={true}>
                      <p>Palidez</p>
                      <div>
                        <GreenCheckbox checked={formState.pallor}
                                       onChange={handleFormChange}
                                       id="pallor-true"
                                       name="pallor"
                                       value={true}/>
                        <label htmlFor="pallor-true">Sim</label>
                        <GreenCheckbox checked={!formState.pallor}
                                       onChange={handleFormChange}
                                       id="pallor-false"
                                       name="pallor"
                                       value={false}/>
                        <label htmlFor="pallor-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={12} visible={true}>
                      <p>Sudorese</p>
                      <div>
                        <GreenCheckbox checked={formState.sweating}
                                       onChange={handleFormChange}
                                       id="sweating-true"
                                       name="sweating"
                                       value={true}/>
                        <label htmlFor="sweating-true">Sim</label>
                        <GreenCheckbox checked={!formState.sweating}
                                       onChange={handleFormChange}
                                       id="sweating-false"
                                       name="sweating"
                                       value={false}/>
                        <label htmlFor="sweating-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={9} visible={true}>
                      <p>Lábios ou face com coloração mais azulada</p>
                      <div>
                        <GreenCheckbox checked={formState.blueSkin}
                                       onChange={handleFormChange}
                                       id="blueSkin-true"
                                       name="blueSkin"
                                       value={true}/>
                        <label htmlFor="blueSkin-true">Sim</label>
                        <GreenCheckbox checked={!formState.blueSkin}
                                       onChange={handleFormChange}
                                       id="blueSkin-false"
                                       name="blueSkin"
                                       value={false}/>
                        <label htmlFor="blueSkin-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={13} visible={true}>
                      <p>Fez oximetria</p>
                      <div>
                        <GreenCheckbox checked={formState.oximetry}
                                       onChange={handleFormChange}
                                       id="oximetry-true"
                                       name="oximetry"
                                       value={true}/>
                        <label htmlFor="oximetry-true">Sim</label>
                        <GreenCheckbox checked={!formState.oximetry}
                                       onChange={handleFormChange}
                                       id="oximetry-false"
                                       name="oximetry"
                                       value={false}/>
                        <label htmlFor="oximetry-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={14} visible={true}>
                      <p>Você apresentou algum sintoma a mais comparado à ontem?</p>
                      <div>
                        <GreenCheckbox checked={formState.extraSymptom}
                                       onChange={handleFormChange}
                                       id="extraSymptom-true"
                                       name="extraSymptom"
                                       value={true}/>
                        <label htmlFor="extraSymptom-true">Sim</label>
                        <GreenCheckbox checked={!formState.extraSymptom}
                                       onChange={handleFormChange}
                                       id="extraSymptom-false"
                                       name="extraSymptom"
                                       value={false}/>
                        <label htmlFor="extraSymptom-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup key={15} visible={formState.extraSymptom}>
                      <p>Qual?</p>
                      <div>
                        <TextField onChange={(e) => {
                          setNewSympt(e.target.value)
                        }}  id="newSymptom" name="newSymptom" value={newSympt} variant="outlined"/>
                      </div>
                    </ChoiceGroup>
                  </InputGroup>
                  <FormButtonGroup>
                    <Button
                      width="13rem"
                      height="3rem"
                      backgroundColor="mountainMeadow"
                      color="white"
                      onClick={() => {
                        toggleModal(true);
                      }}
                      disabled={loading}
                      type="button"
                    >
                      <p>{loading ? 'Enviando...' : 'Enviar'}</p>
                    </Button>
                    <Button
                      type="button"
                      width="13rem"
                      height="3rem"
                      backgroundColor="sunset"
                      color="white"
                      onClick={() => history.push("/avaliacoes")}
                      disabled={loading}
                    >
                      <p>Voltar</p>
                    </Button>
                  </FormButtonGroup>
                </Form>
                <span>
                  Fique tranquilo, seus sintomas serão avaliados por um de
                  nossos infectologistas.
                </span>
              </FormCard>
            </Content>
            <Modal
              toggle={toggle}
              toggleFunction={toggleModal}
              formState={formState}
              formStateFunction={handleFormAnswer}
              sending={sending}
            />
          </Container>
          )
         )
      )}
    </>
  );
}
