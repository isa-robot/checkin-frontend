import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import { CircularProgress } from '@material-ui/core';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

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

export default function Dairy() {
  const initialState = {
    smellLoss: false,
    tasteLoss: false,
    appetiteLoss: false,
    fatigue: false,
    fever: false,
    cough: false,
    diarrhea: false,
    delirium: false,
    soreThroat: false,
    shortnessOfBreath: false,
    abdominalPain: false,
    chestPain: false,
  };

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [approved, setApproved] = useState();
  const [date, setDate] = useState();
  const [toggle, setToggle] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [clearAndSend, setClearAndSend] = useState(false);

  function toggleModal(prop) {
    setToggle(prop);
  }

  function handleFormAnswer() {
    setLoading(true);
    api
      .post(`/users/diaries`, formState)
      .then(response => {
        toast.success('Resposta enviada com sucesso!');
        setApproved(response.data.approved);
        setDate(response.data.date);
        setAnswered(true);
      })
      .catch(() => {
        toast.error('Houve um problema, contate o suporte!');
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
    async function fetchData() {
      const newDate = formatISO(new Date(), { representation: 'date' });
      const dailyAnswer = await api.get(`/users/diaries/date/${newDate}`);

      if (dailyAnswer.data) {
        setAnswered(true);
        setApproved(dailyAnswer.data.approved);
        setDate(dailyAnswer.data.date);
      }
      setLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (clearAndSend) {
      handleFormAnswer();
    }
  }, [clearAndSend]);

  return (
    <>
      {loaded ? (
        answered ? (
          <Container>
            <Content>
              <ApprovalCard approved={approved} date={date} />
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
                    onClick={() => handleOkAnswer()}
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
                    onClick={() => handleToggleForm()}
                    disabled={loading}
                    type="button"
                  >
                    <FaRegThumbsDown size="1rem" color="#FFF" />
                    <strong>Não muito bem...</strong>
                  </Button>
                </MainButtonGroup>
                <span>
                  Aqui na Qualis você têm a disposição uma equipe altamente
                  qualificada que presa pela sua saúde e segurança!
                </span>
              </MainCard>
              <FormCard visible={form}>
                <p>Informe os seus sintomas abaixo</p>
                <Form>
                  <InputGroup>
                    <ChoiceGroup>
                      <strong>Perda de Olfato</strong>
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
                      <strong>Perda de Paladar</strong>
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
                      <strong>Perda de Apetite</strong>
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
                      <strong>Tosse Persistente</strong>
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
                      <strong>Diarréia</strong>
                      <div>
                        <input
                          type="radio"
                          id="diarrhea-true"
                          name="diarrhea"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="diarrhea-true">Sim</label>
                        <input
                          type="radio"
                          id="diarrhea-false"
                          name="diarrhea"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="diarrhea-false">Não</label>
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
                      <strong>Dor de Garganta</strong>
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
                      <strong>Falta de Ar</strong>
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
                      <strong>Dor Abdominal</strong>
                      <div>
                        <input
                          type="radio"
                          id="abdominalPain-true"
                          name="abdominalPain"
                          value="true"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="abdominalPain-true">Sim</label>
                        <input
                          type="radio"
                          id="abdominalPain-false"
                          name="abdominalPain"
                          value="false"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="abdominalPain-false">Não</label>
                      </div>
                    </ChoiceGroup>
                    <ChoiceGroup>
                      <strong>Dor no Peito</strong>
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
                      color="white"
                      onClick={() => handleToggleForm()}
                      disabled={loading}
                    >
                      <strong>Voltar</strong>
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
      ) : (
        <Loading>
          <CircularProgress size="5rem" />
        </Loading>
      )}
    </>
  );
}
