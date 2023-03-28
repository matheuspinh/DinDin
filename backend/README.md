# DinDin - API

Esse diretório armazena uma `API REST` desenvolvida com `NodeJS` e `PostgreSQL`, para fazer o cadastro e login de usuários e lidar com o armazenamento das informações na aplicação.

## Rotas:

### POST /usuario
Valida informações e armazena um novo usuário no banco de dados.

Exemplo de Requisição:

```
curl --request POST \
  --url http://localhost:3000/usuario \
  --header 'Content-Type: application/json' \
  --data '{
  "nome": "Marcos",
  "email": "marcos@email.com",
  "senha": "123456"
}'
```

### POST /login
Verifica e valida as informações enviadas do login de um usuário e devolve um token `JWT` para acesso às rotas protegidas.

Exemplo de Requisição:

```
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
  "email": "maria@email.com",
  "senha": "123456"
}'
```

#### A partir desse ponto todas as rotas são protegidas e devem receber um token de autenticação válido do tipo `Bearer Token` no `header`.

### GET /usuario
Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil. Quando bem sucedida ela deverá retornar um objeto com as informações do usuário, exceto a senha.

Exemplo de requisição:
```
curl --request GET \
  --url http://localhost:3000/usuario \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA'
```

### PUT /usuario
Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.

Exemplo de requisição:
```
curl --request PUT \
  --url http://localhost:3000/usuario \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA' \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}'
```

### GET /categoria

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

Exemplo de requisição:
```
curl --request GET \
  --url http://localhost:3000/categoria \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA'
```

### GET /transacao
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas. Ela deverá retornar um `array` de objetos que representam as transações desse usuário.

Exemplo de requisição:
```
curl --request GET \
  --url http://localhost:3000/transacao \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA'
```

### GET /transacao/:id
Essa é a rota que será chamada quando o usuario logado quiser detalhar uma das suas transações cadastradas.

Exemplo de requisição:
```
curl --request GET \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA' \
  --header 'Content-Type: application/json'
```
### POST /transacao
Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado. Como resposta a API deverá enviar no corpo, as informações da transação cadastrada, incluindo seu respectivo id.

Exemplo de requisição:
```
curl --request POST \
  --url http://localhost:3000/transacao \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA' \
  --header 'Content-Type: application/json' \
  --data '{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}'
```

### PUT /transacao/:id
Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.

Exemplo de requisição:
```
curl --request POST \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA' \
  --header 'Content-Type: application/json' \
  --data '{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}'
```
### DELETE /transacao/:id
Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.

Exemplo de requisição:
```
curl --request DELETE \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA' \
  --header 'Content-Type: application/json'
```
### GET /transacao/extrato
Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas. Como resposta o usuário deverá receber um objeto com o total das receitas e despesas em centavos.

Exemplo de requisição:
```
curl --request GET \
  --url http://localhost:3000/transacao \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwMDI5NTc4LCJleHAiOjE2ODAwMzMxNzh9.PK02BnUg_0dbxGCsRNKqkLdEtkZemHuDJI3NyVdmmUA'
```











