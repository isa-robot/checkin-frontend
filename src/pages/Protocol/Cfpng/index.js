import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import {
  TextField,
  Checkbox,
  withStyles
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

import api from '~/services/api';
import Button from '~/components/Buttons/Button';
import ProtocolCard from '~/components/ProtocolCard';
import Modal from '~/components/ConfirmationModal';
import ApprovalCard from '~/components/ApprovalCard';
import { toast } from 'react-toastify';

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
    newSymptom: ""
  };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [diaryAnswered, setDiaryAnswered] = useState(true);
  const [approved, setApproved] = useState();
  const [approvedDiary, setApprovedDiary] = useState();
  const [dateDiary, setDateDiary] = useState(new Date());
  const [newSympt, setNewSympt] = useState("")
  const [dateExp, setDateExp] = useState(false);
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [clearAndSend, setClearAndSend] = useState(false);

  const [keycloak] = useKeycloak();

  function toggleModal(prop) {
    setToggle(prop);
  }

  async function handleFormAnswer() {
    formState.newSymptom = newSympt
    api
      .post(`/protocols/cfpng`, formState, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(response => {
        toast.success('Resposta enviada com sucesso!');
        setApproved(response.data.approved);
        setDate(response.data.date);
        setAnswered(true);
      })
      .catch((e) => {
        console.info(e)
      });
    setLoading(false);
  }

  function handleOkAnswer() {
    setFormState({
      ...initialState,
    });
    setClearAndSend(true);
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

  useEffect(() => {
    async function loadDiaryAnswer(){

      const diary = await api.get(`/users/diaries/lastbyuser/last`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      })
      if(!diary.data.diary){
        return setDiaryAnswered(false)
      }

      const diaryDate = new Date(diary.data.diary.created_at)
      diaryDate.setDate(diaryDate.getDate() + 13)
      const today = new Date()
      if(today >= diaryDate){
        return setDateExp(true)
      }
      if (diary.data.diary.approved){
        setApprovedDiary(diary.data.diary.approved)
        setDateDiary(diary.data.diary.created_at)
      }else{
        setApprovedDiary(false)
        setDateDiary(diary.data.diary.created_at)
      }
      setLoading(false)
    }
    async function loadDaily() {
      const newDate = formatISO(new Date(), { representation: 'date' });
      const dailyAnswer = await api.get(`/protocols/cfpng/date/${newDate}`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      if (dailyAnswer.data) {
        setAnswered(true);
        setApproved(dailyAnswer.data.approved);
        setDate(dailyAnswer.data.date)
      }
      setLoading(false);
    }
    loadDiaryAnswer();
    loadDaily();
  }, []);

  useEffect(() => {
    if (clearAndSend) {
      handleFormAnswer();
    }
  }, [clearAndSend]);

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
        ): (
        approvedDiary ? (
          <Container>
            <Content>
              <ApprovalCard approved={approvedDiary} date={dateDiary}></ApprovalCard>
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
        answered ? (
          <Container>
            <Content>
              <ProtocolCard approved={approved} date={date} />
            </Content>
          </Container>
          ) : (
          <Container>
            <Content>
              <FormCard visible={true}>
                <h2>Olá, eu sou o ISA o robô da Qualis. Estou entrando em contato pois você sinalizou
                  que está apresentando sintoma compatível com síndrome respiratória gripal
                  em nosso sistema. Primeiramente preciso saber se você não está
                  com algum sinal de infecção mais grave.</h2>
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
                      onClick={() => handleToggleForm()}
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
            />
          </Container>
          )
         )
        )
      )}
    </>
  );
}
