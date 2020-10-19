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
        <span style={{'color': '#e11400aa'}}>Em caso de urgência médica procure atendimento imediatamente.</span>
        <h2><Button variant="contained" color="primary"><Link style={{color: "white"}} to={"/avaliacoes"}>Clique aqui para acessar a página de avaliações</Link></Button></h2>
      </Container>
    );
  }
}

export default ProtocolCard;
