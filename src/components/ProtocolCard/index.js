import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { format } from 'date-fns';
import { Container } from './styles';

function ProtocolCard({ approved, date }) {
  if (approved) {
    return (
      <Container approved={approved}>
        <h1>OBRIGADO!</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <div>
          <h1>{format(new Date(date), "dd/MM/yyyy' às 'HH:mm' ")}</h1>
        </div>
        <p>Bom trabalho!</p>
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
