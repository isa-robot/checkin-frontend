import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { format } from 'date-fns';
import { Container } from './styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

function ApprovalCard({ approved, answered=true, dateExpired = false,  date, protocolActive=false, roles = [""] }) {
  if (approved) {
    return (
      <Container approved={approved}>
        <h1>ENTRADA AUTORIZADA</h1>
        <FaRegCheckCircle color="#FFF" size="10rem" />
        <div>
          <span>Entrada aprovada para o dia</span>
          <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>
        </div>
        <p>Bom trabalho!</p>
        { protocolActive && !roles.includes('student') ? (
          <h2><Button variant="contained" color="primary"><Link style={{ color: "white" }} to={"/avaliacoes"}>Clique aqui para seguir sua avaliação diária</Link></Button></h2>
          ) : ""
        }
      </Container>
    );
  }
  if(!answered) {
    return (
      <Container approved={answered}>
        <h1>Diario não respondido</h1>
        <AiOutlineMinusCircle color="#FFF" size="10rem" />
        <p>Responda o diário antes de acessar a página de avaliações</p>
      </Container>
    );
  }
  return (
    <Container approved={approved}>
      <h1>ENTRADA NÃO AUTORIZADA</h1>
      <AiOutlineMinusCircle color="#FFF" size="10rem" />
      <div>
        <span>Entrada negada para o dia</span>
        <h1>{format(new Date(date), "dd/MM/yyyy")}</h1>
      </div>
      <p>Contate o setor de saúde</p>
      { !roles.includes('student') ? (
        <h2>
          <Button variant="contained"><Link style={{ color: "black" }} to={"/avaliacoes"}>Clique aqui para seguir sua
          avaliação diária</Link></Button></h2>
        ) : ""
      }
    </Container>
  );
}

export default ApprovalCard;
