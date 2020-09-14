# ISA-Frontend

## Keycloak
Para executar o Frontend é necessário estar com uma instância do Keycloak em execução.
A configuração utilizada é fornecida pelo repositório ISA-Backend.

## Dependências
Para a instalação das dependências da aplicação é necessário executar o comando citada abaixo na pasta raiz da aplicação:
```
npm install
```
logo após execute o comando para fazer o build do projeto:
```
npm run build
```
## Buildando e rodando o container
A inicialização do projeto pode ser feita de dois modos:
1. Utilizando containers prontos e disponibilizados pelo projeto
2. Realizando a sua construção localmente

Os dois modos serão apresentados a seguir:

### 1. Utilizando Containers
```
docker build -t isa-frontend .
```
* Uso de imagem disponibilizada *
UNDER CONSTRUCTION

* Inicialização do container *

```
docker run \
       --network isa-net \
       -d -p 80:80 \
       -e REACT_APP_API_URL="http://localhost:3333" \
       -e REACT_APP_KEYCLOAK_SERVER_URL="http://$(hostname -I | awk '{print $1}'):8080/auth" \
       -e REACT_APP_KEYCLOAK_CLIENT="isa-frontend" \
       -e REACT_APP_KEYCLOAK_REALM="isa-qualis" \
        --name isa-frontend \
          isa-frontend
```
As variáveis API_URL e KEYCLOAK_SERVER_URL devem ser preenchidas com o ip das mesmas na network criada, descritas no Isa-Backend

### 2. Opção em ambiente de desenvolvimento com start

para rodar o projeto em ambiente de desenvolvimento, sem container, execute o seguinte comando:
```
REACT_APP_KEYCLOAK_SERVER_URL="http://localhost:8080/auth" REACT_APP_KEYCLOAK_CLIENT="isa-frontend" REACT_APP_KEYCLOAK_REALM="isa-qualis" REACT_APP_API_URL="http://localhost:3333/"  npm start
```

<a href="https://opensource.org/licenses/MIT">
<img src="https://img.shields.io/badge/License-MIT-DarkSlateBlue.svg?style=flat" href="https://opensource.org/licenses/MIT" alt="MIT License">
</a>

<a href="https://github.com/isa-robot/checkin-frontend/blob/master/package.json">

<img src="https://img.shields.io/badge/package.json%20version%20-1.0.0-green.svg?style=flat" alt="package.json version">
</a>

<a href="https://observatory.mozilla.org/analyze/isarobot.ai">
<img src="https://img.shields.io/badge/Mozilla%20Observatory-F-red.svg?style=flat" alt="Mozilla Observatory">
</a>

<a href="https://securityheaders.com/?q=isarobot.ai&followRedirects=on">
<img src="https://img.shields.io/badge/Security%20Headers-F-red.svg?style=flat" alt="Security Headers">
</a>

<a href="https://codeclimate.com/github/isa-robot/checkin-frontend">
<img src="https://img.shields.io/badge/Code%20Climate-F-red.svg?style=flat" alt="Code Climate">
</a>

<a href="https://codecov.io/gh/isa-robot/checkin-frontend"> 
<img src="https://img.shields.io/badge/Codecov-F-red.svg?style=flat" alt="Codecov">
</a>

<a href="https://travis-ci.org/isa-robot/checkin-frontend.svg?branch=master">
<img src="https://travis-ci.org/isa-robot/checkin-frontend.svg?branch=master&style=flat" href="https://travis-ci.org/isa-robot/checkin-frontend" alt="Build Status">
</a>

<a href="https://snyk.io/test/github/isa-robot/checkin-frontend">
  <img src="https://snyk.io/test/github/isa-robot/checkin-frontend/badge.svg?style=flat" href="https://snyk.io/test/github/isa-robot/checkin-frontend" alt="Known Vulnerabilities">
</a>

<a href="https://deepscan.io/dashboard#view=project&tid=10666&pid=13767&bid=240493">
  <img src="https://deepscan.io/api/teams/10666/projects/13767/branches/240493/badge/grade.svg?style=flat" alt="DeepScan grade">
</a>

<a href="https://github.com/isa-robot/checkin-frontend/commits">
  <img src="https://img.shields.io/badge/GitHub%20commit%20activity-up-green.svg?style=flat" alt="GitHub commit activity">
</a>

<a href="https://github.com/isa-robot/checkin-frontend/commit/">
  <img src="https://img.shields.io/badge/GitHub%20last%20commit-up-green.svg?style=flat" alt="GitHub last commit">
</a>

