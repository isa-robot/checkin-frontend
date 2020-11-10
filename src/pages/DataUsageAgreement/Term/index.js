import React, { useState, useEffect } from 'react';
import {format, formatISO} from 'date-fns';
import { toast } from 'react-toastify';
import { useKeycloak } from '@react-keycloak/web';

import {
  Container,
  MainCard,
  FlexBox,
} from './styles';

import api from '~/services/api';
import Button from '~/components/Buttons/Button';

export default function Term() {

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [protocolActive ,setProtocolActive] = useState(false)
  const [answered, setAnswered] = useState(false);
  const [approved, setApproved] = useState();
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [formState, setFormState] = useState();
  const [clearAndSend, setClearAndSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [keycloak] = useKeycloak();

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
    setFormState({});
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

  return (
    <FlexBox>
        <Container>
            <h2>TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS
              PESSOAIS DE CRIANÇA/ADOLESCENTE</h2>
            <MainCard>
              <div>
                <span>Em  razão  da  necessidade  de  cuidados  e  precauções  decorrentes  da  situação  de
                  pandemia da COVID-19 (coronavírus) e considerando as disposições contidas na Lei nº
                  13.709/18  (Lei  Geral  de  Proteção  de  Dados),  DECLARO  ESTAR  CIENTE  E  DE
                  ACORDO em disponibilizar dados pessoais e sensíveis do(a) criança/adolescente acima
                  indicado(a),  dentre  os  quais  se  destacam  o  nome,  sobrenome,  sexo,  idade,  endereço,
                  doenças pretéritas, condições de saúde, autorizando tratamento destes dados, pelo tempo
                  que  se  fizer  necessário,  para  o  fim  único  e  exclusivo  de:  tutela  da  saúde  do(a)
                  criança/adolescente e todos os demais alunos(as) da Instituição de Ensino que se encontra
                  este  vinculado,  especialmente  para  fins  de  estabelecer  mecanismos  de  controle  à
                  transmissão do Coronavírus.
                  Dessa forma, AUTORIZO a QUALIS a utilizar os dados pessoais acima referido
                  em processos internos, inclusive compartilhando com eventuais parceiros e colaboradores
                  que atuem conjuntamente na tutela de saúde dos alunos(as) da Instituição de Ensino que
                  se  encontra  o(a)  criança/adolescente  vinculado(a),  desde  que  respeitada  sempre  a
                  finalidade acima indicada.
                  Ademais,  DECLARO  estar  ciente  de  que,  na  condição  de  responsável  legal,  a
                  qualquer momento, poderei revogar o consentimento constante neste Termo, bem como
                  requerer  a  anonimização,  bloqueio,  retificação  ou  eliminação  de  dados  desnecessários,
                  excessivos  ou  tratados  em  desconformidade  com  a  LGPD,  mediante  comunicação  por
                  escrito endereçada ao e-mail contato@portalqualis.com.br.</span>
                  <span>Porto Alegre (RS), outubro de 2020.</span>
                  <span>Atenciosamente</span>
                  <span>Equipe QUALIS – Soluções em Infectologia</span>
              </div>
            </MainCard>
            <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>

              <divButton>
                <Button backgroundColor="mountainMeadow">
                  <strong>Aceito</strong>
                </Button>

                <Button backgroundColor="sunset">
                  <strong>Não aceito</strong>
                </Button>

              </divButton>
        </Container>
    </FlexBox>
  );
}
