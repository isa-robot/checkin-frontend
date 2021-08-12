import React from 'react';
import { Container } from './styles';
import { FcCustomerSupport } from 'react-icons/fc';
import ScriptTag from "react-script-tag";

export default function Header() {
  return (
    <Container>
      <div id="sslblindado">
        <param id="sslblindado_preload" value="true"/>
      </div>

      <p>
        {`Qualis © ${new Date().getFullYear()} - Todos os direitos reservados`}
      </p>
      <a href="mailto:suporte@portalqualis.com.br">
        <FcCustomerSupport size="2rem" />
      </a>

      <ScriptTag type="text/javascript" src="https://selo.siteblindado.com/sslblindado.js" />
    </Container>
  );
}
