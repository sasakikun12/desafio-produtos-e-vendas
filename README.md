# Desafio produtos e vendas

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Como rodar](#como-rodar)
- [Funcionalidades implementadas](#funcionalidades-implementadas)

## Tecnologias utilizadas

#### Front-end

- React.js

#### Back-end

- Node.js
- Express.js
- Sequelize
- JWT
- Postman: [Documentação das Rotas](https://documenter.getpostman.com/view/32098509/2sA2rCUMYN#92bbc316-e35d-423b-9168-34f5d3b0ebf7)

#### Banco de dados

- PostgreSQL

## Como rodar

#### Front-end

- Projeto criado na versão v20.10.0 do Node
- Clonar o repositório
- Rodar `npm install` para instalar as dependencias do projeto
- Rodar `npm start` para rodar o projeto

#### Back-end

- Banco de dados PostgreSQL
- Necessário criar um arquivo .env na raiz do projeto back-end com as seguintes informações:
  ```js
  PGUSER = nome_do_usuario;
  PGHOST = localhost;
  PGDATABASE = nome_do_banco;
  PGPASSWORD = senha_do_banco;
  DIALECT = postgres;
  PGPORT = 5432;
  PG_TABLE = tabela_do_banco;
  SECRET_TOKEN = seed_do_jwt;
  ```
- Projeto criado na versão v20.10.0 do Node
- Clonar o repositório
- Rodar `npm install` para instalar as dependencias do projeto
- Rodar `npm start` para rodar o projeto

## Funcionalidades implementadas

O projeto foi pensado para ser um controle de estoque e vendas, portanto é possível realizar o conjunto de funções CRUD:

#### Usuário

- Cadastro de usuário
- Realizar login com autenticação JWT
- Alteração dos dados do usuário (back-end)
- Remoção do usuário (back-end)

#### Produtos

- Cadastro de produtos (Simples/Digital)
- Listagem dos produtos
- Alteração nas informações do produto
- Remoção do produto
- Log de alteração do valor dos produtos (back-end)
- Controle de estoque (impede que ocorram vendas maiores que a quantidade de produtos e quando há uma venda altera a quantidade de produtos)
- Criação da política de descontos, a qual impede a criação de descontos com conflito de horário para o mesmo produto (back-end)

#### Vendas

- Cadastro de vendas
- Listagem das vendas
- Alteração das informações de vendas
- Remoção da venda
