# DinDin
## _Controle suas finanças sem planilha chata._

#### Disponível em:
- [DinDin](https://din-din-seven.vercel.app/)

DinDin é uma aplicação para organização financeira, que faz uso das tecnologias `ReactJS` na interface, `NodeJS` na criação da `API REST` e `PostgreSQL` na criação do banco de dados. Nela o usuário, após criar uma conta, pode registrar todas suas movimentações financeiras centralizando as informações e assim pode ter melhor controle das suas própriuas finanças.

## Features

- Cadastro de usuário e persistência de informações através das sessões.
- Registro de receitas e despesas individuais com valor, data e categoria
- Filtro de registros de acordo com as categorias
- Edição e exclusão de registros
- Ordenamento pela data do registro

## Tecnologias

DinDin foi desenvolvido com as seguintes tecnologias

- [ReactJS](https://react.dev/) - Uma biblioteca para criar interfaces de usuários.
- [NodeJS](https://nodejs.org/en) - Um runtime JavaScript desenvolvido com o Chrome's V8 JavaScript engine.
- [PostgreSQL](https://www.postgresql.org/) - O banco de dados relacional open source mais avançado do mundo.

## Instalação

DinDin requer npm, NodeJS e PostgreSQL

Para iniciar o servidor é necessária a criação do banco de dados com os comandos encontrados em `./backend/query.sql`
Após isso é necessária a configuração das credenciais de conexão com o banco de dados encontradas em `./backend/src/conexao.js`

Após a criação do banco de dados o servidor pode ser iniciado seguindo o passo a passo abaixo:
Em um terminal aberto no repositório execute:
```sh
cd backend
npm i
npm run dev
```

Após a inicialização do servidor a aplicação de front end pode ser iniciada, em outro terminal no repositório execute:

```sh
cd frontend/dindin
npm i
npm start
```
## Documentação

A documentação de cada stack pode ser encontrada no README.md em seus respectivos repositórios.
