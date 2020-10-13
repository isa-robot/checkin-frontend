import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { format } from 'date-fns';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ProtocolCard({ approved, date }) {
  if (approved) {
    return (
      <Container approved={approved}>
        <h1>OBRIGADO!</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <h2>você respondeu o protocolo do dia:</h2>
        <div>
          <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>
        </div>
        <h2><Button variant="contained" color="primary"><Link style={{color: "white"}} to={"/protocolos"}>Acessar página protocolos</Link></Button></h2>
      </Container>
    );
  }
  return (
    <Container approved={approved}>
      <span>Você está apresentando sinais de doença mais grave entre em contato com o seu médico
              ou procure atendimento em uma emergência para avaliação. Em até uma hora um
              profissional da Qualis irá fazer contato com você.</span>
      <AiOutlineMinusCircle color="#FFF" size="10rem" />
      <div>
        <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
      </div>
    </Container>
  );
}

export default ProtocolCard;
