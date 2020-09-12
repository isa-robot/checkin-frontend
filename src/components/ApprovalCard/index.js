import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { format } from 'date-fns';
import { Container } from './styles';

function ApprovalCard({ approved, answered=true, dateExpired = false,  date }) {
  if (approved) {
    return (
      <Container approved={approved}>
        <h1>ENTRADA AUTORIZADA</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <div>
          <span>Entrada aprovada para o dia</span>
          <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
        </div>
        <p>Bom trabalho!</p>
      </Container>
    );
  }
  if(!answered) {
    return (
      <Container approved={answered}>
        <h1>Diario não respondido</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <div>
          <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
        </div>
        <p>Responda o diário antes de responder o protocolo</p>
      </Container>
    );
  }
  if(dateExpired) {
    return (
      <Container approved={answered}>
        <h1>Protocolos respondidos</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <div>
          <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
        </div>
        <p>Os protocolos foram respondidos durante 14 dias
          após ser bloqueado no sistema</p>
        <p>Bom trabalho!</p>
      </Container>
    )
  }
  return (
    <Container approved={approved}>
      <h1>ENTRADA NÃO AUTORIZADA</h1>
      <AiOutlineMinusCircle color="#FFF" size="10rem" />
      <div>
        <span>Entrada negada para o dia</span>
        <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
      </div>
      <p>Contate o setor de saúde</p>
    </Container>
  );
}

export default ApprovalCard;
