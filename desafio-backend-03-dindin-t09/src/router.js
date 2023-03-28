const express = require('express')
const verificarLogin = require('./middleware/auth')
const {
  cadastrarUsuario,
  loginUsuario,
  exibirPerfilUsuario,
  alterarUsuario
} = require('./controllers/users')

const { exibirCategorias } = require('./controllers/categories')
const { exibirTransacoes, atualizarTransacao, excluirTransacao, cadastrarTransacao, detalharTransacao, obterExtrato } = require('./controllers/transactions')
// const {
//   cadastrarTransacao
// } = require('./controllers/transactions')

const rotas = express()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', loginUsuario)

rotas.use(verificarLogin)

rotas.get('/usuario', exibirPerfilUsuario)
rotas.put('/usuario', alterarUsuario)
rotas.post('/transacao', cadastrarTransacao)
rotas.get('/categoria', exibirCategorias)
rotas.get('/transacao', exibirTransacoes)
rotas.put('/transacao/:id', atualizarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)
rotas.post('/transacao', cadastrarTransacao)
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao/:id', detalharTransacao)

module.exports = rotas