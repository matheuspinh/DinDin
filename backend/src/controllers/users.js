const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const cadastrarUsuario = async (req, res) => {
  console.log('here')
  const { nome, email, senha } = req.body
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
  }
  try {
    const emailExiste = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )
    if (emailExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3) RETURNING *
    `
    const valores = [nome, email, senhaCriptografada]

    const { rows } = await pool.query(query, valores)

    const { senha: _, ...usuario } = rows[0]

    return res.status(201).json(usuario)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ mensagem: 'Erro interno de servidor' })
  }
}

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  if (!email, !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (rowCount === 0) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }

    const { senha: senhaSalva, ...usuario } = rows[0]

    const senhaCorreta = await bcrypt.compare(senha, senhaSalva)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '1h' })

    return res.json({
      usuario,
      token,
    })
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const exibirPerfilUsuario = (req, res) => {
  return res.json(req.usuario)
}

const alterarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
  }
  try {
    const emailExiste = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )
    if (emailExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const { id } = req.usuario;
    const query = `
      UPDATE usuarios
      SET nome = $1, email = $2, senha = $3
      WHERE id = $4
      `
    const valores = [nome, email, senhaCriptografada, id]

    pool.query(query, valores)

    return res.json()
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  exibirPerfilUsuario,
  alterarUsuario
}