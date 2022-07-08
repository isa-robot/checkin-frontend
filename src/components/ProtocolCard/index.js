import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { format } from 'date-fns';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ProtocolCard({ approved, date }) {
  return (
    <Container>
      <h1>OBRIGADO!</h1>
      <h2>você respondeu a avaliação do dia:</h2>
      <div>
        <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>
      </div>
      { !approved ? (
        <span>
          Entraremos em contato nas próximas horas
          </span>
          ) : ""
      }
        <h3 style={{'color': '#e11400ee'}}>Em caso de urgência médica procure atendimento imediatamente.</h3>
      </Container>
    );
}

export default ProtocolCard;
