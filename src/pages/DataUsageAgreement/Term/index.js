import React, { useState, useEffect } from 'react';
import {format, formatISO} from 'date-fns';

import { useDispatch } from 'react-redux';
import {
  Container,
  MainCard,
  FlexBox,
  ButtonDiv,
  Content,
} from './styles';
import api from '~/services/api';
import Button from '~/components/Buttons/Button';
import {toast} from "react-toastify";
import {useKeycloak} from "@react-keycloak/web";
import {useHistory} from 'react-router-dom';
import {keycloak} from "~/keycloak";
import { useSelector } from 'react-redux';

import {UpdateUser} from '~/store/modules/auth/actions'

export default function Term() {
  const initialState = {
    personalKidDataTerm: false,
    responsabilityTerm: false
  };

  const [terms, setTerms] = useState(["    TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS DE CRIANÇA/ADOLESCENTE: \n" +
  "                  Em  razão  da  necessidade  de  cuidados  e  precauções  decorrentes  da  situação  de\n" +
  "                  pandemia da COVID-19 (coronavírus) e considerando as disposições contidas na Lei nº\n" +
  "                  13.709/18  (Lei  Geral  de  Proteção  de  Dados),  DECLARO  ESTAR  CIENTE  E  DE\n" +
  "                  ACORDO em disponibilizar dados pessoais e sensíveis do(a) criança/adolescente acima\n" +
  "                  indicado(a),  dentre  os  quais  se  destacam  o  nome,  sobrenome,  sexo,  idade,  endereço,\n" +
  "                      doenças pretéritas, condições de saúde, autorizando tratamento destes dados, pelo tempo\n" +
  "                  que  se  fizer  necessário,  para  o  fim  único  e  exclusivo  de:  tutela  da  saúde  do(a)\n" +
  "                  criança/adolescente e todos os demais alunos(as) da Instituição de Ensino que se encontra\n" +
  "                  este  vinculado,  especialmente  para  fins  de  estabelecer  mecanismos  de  controle  à\n" +
  "                  transmissão do Coronavírus.\n" +
  "                      Dessa forma, AUTORIZO a QUALIS a utilizar os dados pessoais acima referido\n" +
  "                  em processos internos, inclusive compartilhando com eventuais parceiros e colaboradores\n" +
  "                  que atuem conjuntamente na tutela de saúde dos alunos(as) da Instituição de Ensino que\n" +
  "                  se  encontra  o(a)  criança/adolescente  vinculado(a),  desde  que  respeitada  sempre  a\n" +
  "                  finalidade acima indicada.\n" +
  "                      Ademais,  DECLARO  estar  ciente  de  que,  na  condição  de  responsável  legal,  a\n" +
  "                  qualquer momento, poderei revogar o consentimento constante neste Termo, bem como\n" +
  "                  requerer  a  anonimização,  bloqueio,  retificação  ou  eliminação  de  dados  desnecessários,\n" +
  "                      excessivos  ou  tratados  em  desconformidade  com  a  LGPD,  mediante  comunicação  por\n" +
  "                  escrito endereçada ao e-mail contato@portalqualis.com.br.\n" +
  "                      Porto Alegre (RS), outubro de 2020.\n" +
  "                  Atenciosamente\n" +
  "                  Equipe QUALIS – Soluções em Infectologia",

    "                  TERMO DE RESPONSABILIDADE E DECLARAÇÕES: \n" +
    "                  Em  razão  da  necessidade  de  cuidados  e  precauções  decorrentes  da  situação  de\n" +
    "                  pandemia da COVID-19 (coronavírus) e considerando as disposições contidas na Lei nº\n" +
    "                  13.709/18  (Lei  Geral  de  Proteção  de  Dados),  DECLARO  ESTAR  CIENTE  E  DE\n" +
    "                  ACORDO em disponibilizar dados pessoais e sensíveis do(a) criança/adolescente acima\n" +
    "                  indicado(a),  dentre  os  quais  se  destacam  o  nome,  sobrenome,  sexo,  idade,  endereço,\n" +
    "                  doenças pretéritas, condições de saúde, autorizando tratamento destes dados, pelo tempo\n" +
    "                  que  se  fizer  necessário,  para  o  fim  único  e  exclusivo  de:  tutela  da  saúde  do(a)\n" +
    "                  criança/adolescente e todos os demais alunos(as) da Instituição de Ensino que se encontra\n" +
    "                  este  vinculado,  especialmente  para  fins  de  estabelecer  mecanismos  de  controle  à\n" +
    "                  transmissão do Coronavírus.\n" +
    "                  Dessa forma, AUTORIZO a QUALIS a utilizar os dados pessoais acima referido\n" +
    "                  em processos internos, inclusive compartilhando com eventuais parceiros e colaboradores\n" +
    "                  que atuem conjuntamente na tutela de saúde dos alunos(as) da Instituição de Ensino que\n" +
    "                  se  encontra  o(a)  criança/adolescente  vinculado(a),  desde  que  respeitada  sempre  a\n" +
    "                  finalidade acima indicada.\n" +
    "                  Ademais,  DECLARO  estar  ciente  de  que,  na  condição  de  responsável  legal,  a\n" +
    "                  qualquer momento, poderei revogar o consentimento constante neste Termo, bem como\n" +
    "                  requerer  a  anonimização,  bloqueio,  retificação  ou  eliminação  de  dados  desnecessários,\n" +
    "                  excessivos  ou  tratados  em  desconformidade  com  a  LGPD,  mediante  comunicação  por\n" +
    "                  escrito endereçada ao e-mail contato@portalqualis.com.br.\n" +
    "                  Porto Alegre (RS), outubro de 2020.\n" +
    "                  Atenciosamente\n" +
    "                  Equipe QUALIS – Soluções em Infectologia", ""]) ;

  const [selectedTerm, setSelectedTerm]= useState('');
  const [date, setDate] = useState(new Date());
  const [textIndex, setTextIndex] = useState(0);
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [keycloak] = useKeycloak();
  const history = useHistory();
  const { roles, resources, username, emailVerified, baseline, name, termsAccepted } = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (termsAccepted) history.push('/qualis');
    setSelectedTerm(terms[textIndex]);
  },[]);

  function handleTermChange(evt) {
    const { value, name } = evt.target;
    setFormState({
      ...formState,
      [name]: value === 'true',
    });
  }

  function handleTermAnswer() {
    setLoading(true);
     api
      .post(`/users/terms/create`, formState, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then(response => {
        toast.success('Resposta enviada com sucesso!');
        const user = {}
        const termsAccepted = response.data.canUseTheSystem
        user.profile = { roles, resources, username, emailVerified, baseline, name, termsAccepted }
        dispatch(UpdateUser(user))
        history.push('/qualis')
      })
      .catch((e) => {
        console.info(e)
        toast.error('Houve um problema, contate o suporte!');
      });

    setLoading(false);
  }

    function nextTerm(currTextIndex){
      if(currTextIndex < terms.length - 1){
        setTextIndex(currTextIndex + 1);
        setSelectedTerm(terms[currTextIndex + 1]);
      }
    }

  function previousTerm(currTextIndex){
    if(currTextIndex > 0 ){
      setTextIndex(currTextIndex - 1);
      setSelectedTerm(terms[currTextIndex - 1]);
    }
  }
  return (
    <FlexBox>
        <Container>
          <MainCard>
            { textIndex <= 1 ? (
            <div id="termo">
              {selectedTerm}
            </div>
            ) : (
                <div id="finalizar">
                  <h2>Deseja finalizar?</h2><br/>
                  <span>Ao clicar em finalizar você concorda com o envio dos termos apresentados.</span>
                </div>
              )
            }
          </MainCard>

          <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>
          <ButtonDiv>
            { textIndex > 0 ? (
              <Button id={"voltar"} onClick={() => previousTerm(textIndex)} >
                <strong>Voltar</strong>
              </Button>
            ) : ''
            }
            { textIndex <= 1 ? (
            <button value={false} name={ textIndex == 0 ? 'personalKidDataTerm' : 'responsabilityTerm' } id={"naoAceito"} onClick={(e) => {

              handleTermChange(e)
              nextTerm(textIndex)}
            }>
             Não aceito
            </button>
            ) : ''
            }
            { textIndex <= 1 ? (
            <button id={"aceito"} value={true} name={ textIndex == 1 ? 'responsabilityTerm' : 'personalKidDataTerm' } onClick={(e) => {

              handleTermChange(e)
              nextTerm(textIndex)}
            }>
              Aceito
            </button>
            ) : ''
            }
            { textIndex > 1 ? (
              <Button onClick={() => handleTermAnswer()} id={"finalizar"}>
                <strong>Finalizar</strong>
              </Button>
            ) : ''
            }
          </ButtonDiv>
        </Container>
    </FlexBox>
  );
}
