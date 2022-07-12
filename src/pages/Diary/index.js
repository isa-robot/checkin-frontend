import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import { CircularProgress } from '@material-ui/core';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { useKeycloak } from '@react-keycloak/web';

import {
  Container,
  Content,
  Loading,
  MainCard,
  FormCard,
  MainButtonGroup,
  FormButtonGroup,
  ChoiceGroup,
  InputGroup,
} from './styles';

import api from '~/services/api';
import Button from '~/components/Buttons/Button';
import ApprovalCard from '~/components/ApprovalCard';
import Modal from '~/components/ConfirmationModal';
import { useSelector } from 'react-redux';

export default function Dairy() {
  const initialState = {
    smellLoss: false,
    tasteLoss: false,
    appetiteLoss: false,
    fatigue: false,
    fever: false,
    cough: false,
    delirium: false,
    soreThroat: false,
    shortnessOfBreath: false,
    chestPain: false,
    coryza: false,
    hadContactWithInfected: false,
  };

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [protocolActive ,setProtocolActive] = useState(false)
  const [answered, setAnswered] = useState(false);
  const [approved, setApproved] = useState();
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [clearAndSend, setClearAndSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [keycloak] = useKeycloak();
  const { roles, termsAccepted } = useSelector(state => state.user.profile);
  const [ hadContactWithInfectedAnswered, setHadContactWithInfectedAnswered ] = useState(false);
  const [ contactWithInfectedForm, setContactWithInfectedForm ] = useState(false);
  const [hasSimptomsForm, setHasSimptomsForm] = useState(false);

  function toggleModal(prop) {
    setToggle(prop);
  }

  async function handleFormAnswer() {
    setLoading(true);
    setSending(true);
    await api
      .post(`/users/diaries`, formState, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(response => {
        toast.success('Resposta enviada com sucesso!');
        setApproved(response.data.approved);
        setDate(new Date());
        setAnswered(true);
        verifyProtocolsActive();
        setSending(false)
      })
      .catch(() => {
        setSending(false)
        toast.error('Houve um problema, contate o suporte!');
      });
    setLoading(false);
  }

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

  function handleToggleContactWithInfected() {
    setContactWithInfectedForm(!contactWithInfectedForm);
  }

  function handleToggleHasSimptomsForm() {
    setHasSimptomsForm(!hasSimptomsForm);
  }

  useEffect(() => {
    async function fetchData() {
      const newDate = formatISO(new Date(), { representation: 'date' });
      const dailyAnswer = await api.get(`/users/diaries/date/${newDate}`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      if (dailyAnswer.data) {
        setAnswered(true);
        setApproved(dailyAnswer.data.approved);
        setDate(dailyAnswer.data.date);
      }
      setLoaded(true);
    }
    fetchData();
    verifyProtocolsActive()
  }, []);


  useEffect(() => {
    if (clearAndSend) {
      handleFormAnswer();
    }
  }, [clearAndSend]);

  function handleContactWithInfectedAnswered(value){
    setFormState({
      ...formState,
      hadContactWithInfected: value,
    });
    handleToggleContactWithInfected();
    setHadContactWithInfectedAnswered( !hadContactWithInfectedAnswered );
  }

  return (
    <>
      {loaded ? (
        answered ? (
          <Container>
            <Content>
              <ApprovalCard approved={approved}
                            protocolActive={protocolActive}
                            date={date}
                            roles={roles} />
            </Content>
          </Container>
        ) : (
          <Container>
            <Content>
              <MainCard visible={!form}>
                <p>
                  Ajude a sua instituição no combate ao COVID-19 através do
                  nosso questionário diário.
                </p>
                <h1>Como você está se sentindo?</h1>
                <MainButtonGroup>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="mountainMeadow"
                    color="white"
                    onClick={() => [handleToggleContactWithInfected(), handleToggleForm()]}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsUp size="1rem" color="#FFF" />
                    <strong>Bem, obrigado!</strong>
                  </Button>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="sunset"
                    color="white"
                    onClick={() => [handleToggleContactWithInfected(), handleToggleForm()]}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsDown size="1rem" color="#FFF" />
                    <strong>Não muito bem.</strong>
                  </Button>
                </MainButtonGroup>
                <span>
                  Aqui na Qualis você têm à disposição uma equipe altamente
                  qualificada que preza pela sua saúde e segurança!
                </span>
              </MainCard>
              <MainCard visible={ contactWithInfectedForm }>
                <h2>Você teve contato prolongado e sem uso de máscara com alguém infectado por COVID-19 nos últimos 7 dias?</h2>
                <FormButtonGroup>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="mountainMeadow"
                    color="white"
                    onClick={() => [handleContactWithInfectedAnswered(true), handleToggleHasSimptomsForm()]}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsUp size="1rem" color="#FFF" />
                    <strong>Sim</strong>
                  </Button>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="sunset"
                    color="white"
                    onClick={() => [handleContactWithInfectedAnswered(false), handleToggleHasSimptomsForm()]}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsDown size="1rem" color="#FFF" />
                    <strong>Não</strong>
                  </Button>

                  <Button
                    type="button"
                    width="13rem"
                    height="3rem"
                    backgroundColor="dimGray"
                    color="black"
                    children={<strong>Voltar</strong>}
                    onClick={() => [handleToggleContactWithInfected(), handleToggleForm()]}
                    disabled={loading}
                  >
                  </Button>
                </FormButtonGroup>
                <span>
                </span>
              </MainCard>
              <MainCard visible={ !contactWithInfectedForm && hasSimptomsForm }>
                <h1>Você tem algum sintoma?</h1>
                <div style={{height: "70px"}}></div>
                <FormButtonGroup>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="mountainMeadow"
                    color="white"
                    onClick={() => handleToggleHasSimptomsForm()}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsUp size="1rem" color="#FFF" />
                    <strong>Sim</strong>
                  </Button>
                  <Button
                    width="13rem"
                    height="3rem"
                    backgroundColor="sunset"
                    color="white"
                    onClick={() => {
                      toggleModal(true);
                    }}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsDown size="1rem" color="#FFF" />
                    <strong>Não</strong>
                  </Button>
                  <Button
                    type="button"
                    width="13rem"
                    height="3rem"
                    backgroundColor="dimGray"
                    color="black"
                    children={<strong>Voltar</strong>}
                    onClick={() => [handleToggleHasSimptomsForm(), handleToggleContactWithInfected()]}
                    disabled={loading}
                  >
                  </Button>
                </FormButtonGroup>
              </MainCard>
              <FormCard visible={form && !contactWithInfectedForm && !hasSimptomsForm }>
                <p>Informe os seus sintomas abaixo</p>
                <Form>
                  <InputGroup>
                    <ChoiceGroup>
                      <strong>Perda de olfato</strong>
                      <div>
                        <input
                          type="radio"
                          id="smellLoss-true"
                          name="smellLoss"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="smellLoss-true">Sim</label>
                        <input
                          type="radio"
                          id="smellLoss-false"
                          name="smellLoss"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="smellLoss-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Perda de paladar</strong>
                      <div>
                        <input
                          type="radio"
                          id="tasteLoss-true"
                          name="tasteLoss"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="tasteLoss-true">Sim</label>
                        <input
                          type="radio"
                          id="tasteLoss-false"
                          name="tasteLoss"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="tasteLoss-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Perda de apetite</strong>
                      <div>
                        <input
                          type="radio"
                          id="appetiteLoss-true"
                          name="appetiteLoss"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="appetiteLoss-true">Sim</label>
                        <input
                          type="radio"
                          id="appetiteLoss-false"
                          name="appetiteLoss"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="appetiteLoss-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Cansaço</strong>
                      <div>
                        <input
                          type="radio"
                          id="fatigue-true"
                          name="fatigue"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="fatigue-true">Sim</label>
                        <input
                          type="radio"
                          id="fatigue-false"
                          name="fatigue"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="fatigue-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Febre</strong>
                      <div>
                        <input
                          type="radio"
                          id="fever-true"
                          name="fever"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="fever-true">Sim</label>
                        <input
                          type="radio"
                          id="fever-false"
                          name="fever"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="fever-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Tosse persistente</strong>
                      <div>
                        <input
                          type="radio"
                          id="cough-true"
                          name="cough"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="cough-true">Sim</label>
                        <input
                          type="radio"
                          id="cough-false"
                          name="cough"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="cough-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Delírios</strong>
                      <div>
                        <input
                          type="radio"
                          id="delirium-true"
                          name="delirium"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="delirium-true">Sim</label>
                        <input
                          type="radio"
                          id="delirium-false"
                          name="delirium"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="delirium-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Dor de garganta</strong>
                      <div>
                        <input
                          type="radio"
                          id="soreThroat-true"
                          name="soreThroat"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="soreThroat-true">Sim</label>
                        <input
                          type="radio"
                          id="soreThroat-false"
                          name="soreThroat"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="soreThroat-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Falta de ar</strong>
                      <div>
                        <input
                          type="radio"
                          id="shortnessOfBreath-true"
                          name="shortnessOfBreath"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="shortnessOfBreath-true">Sim</label>
                        <input
                          type="radio"
                          id="shortnessOfBreath-false"
                          name="shortnessOfBreath"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="shortnessOfBreath-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Dor no peito</strong>
                      <div>
                        <input
                          type="radio"
                          id="chestPain-true"
                          name="chestPain"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="chestPain-true">Sim</label>
                        <input
                          type="radio"
                          id="chestPain-false"
                          name="chestPain"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="chestPain-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Coriza</strong>
                      <div>
                        <input
                          type="radio"
                          id="coryza-true"
                          name="coryza"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="coryza-true">Sim</label>
                        <input
                          type="radio"
                          id="coryza-false"
                          name="coryza"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="coryza-false">Não</label>
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
                      <strong>{loading ? 'Enviando...' : 'Enviar'}</strong>
                    </Button>
                    <Button
                      type="button"
                      width="13rem"
                      height="3rem"
                      backgroundColor="sunset"
                      color="black"
                      onClick={() => handleToggleForm()}
                      disabled={loading}
                    >
                      <strong>cancelar</strong>
                    </Button>
                    <Button
                      type="button"
                      width="13rem"
                      height="3rem"
                      backgroundColor="dimGray"
                      color="black"
                      children={<strong>Voltar</strong>}
                      onClick={() => [handleToggleHasSimptomsForm()]}
                      disabled={loading}
                    >
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
              sending={sending}
              formStateFunction={handleFormAnswer}
            />
          </Container>
        )
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
