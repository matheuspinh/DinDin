const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')


const exibirTransacoes = async (req, res) => {
  try {
    const { id } = req.usuario;
    const query = `
                        SELECT 
                        transacoes.id, 
                        transacoes.tipo, 
                        transacoes.descricao, 
                        transacoes.valor, 
                        transacoes.data, 
                        transacoes.usuario_id, 
                        transacoes.categoria_id, 
                        categorias.descricao as categoria_nome
                        FROM transacoes 
                        LEFT JOIN categorias ON transacoes.categoria_id = categorias.id
                        WHERE usuario_id = $1;
                        `
    const transacoes = await pool.query(query, [id])
    return res.json(transacoes.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }

}

const atualizarTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const usuario_id = req.usuario.id

    if (isNaN(id)) {
      return res.status(500).json({ mensagem: 'O ID da transação deve ser um número válido' })
    }

    const transacaoExiste = await pool.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuario_id])
    if (transacaoExiste.rowCount < 1) {
      return res.status(500).json({ mensagem: 'O ID informado não existe ou não pertence ao usuário logado' })
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
    }

    const categoriaExiste = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id])
    if (categoriaExiste.rowCount < 1) {
      return res.status(500).json({ mensagem: 'Não existe categoria com o ID informado' })
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      console.log(typeof tipo);
      return res.status(500).json({ mensagem: `O campo 'tipo' deve ser preenchido com o valor 'entrada' ou 'saida'` })
    }

    const query = `
            UPDATE transacoes
            SET descricao = $1,
                valor = $2, 
                data = $3, 
                categoria_id = $4, 
                tipo = $5
            WHERE id = $6
        `
    const valores = [descricao, valor, data, categoria_id, tipo, id]
    pool.query(query, valores)
    return res.json()
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const excluirTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id

    if (isNaN(id)) {
      return res.status(500).json({ mensagem: 'O ID da transação deve ser um número válido' })
    }

    const transacaoExiste = await pool.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuario_id])
    if (transacaoExiste.rowCount < 1) {
      return res.status(500).json({ mensagem: 'O ID informado não existe ou não pertence ao usuário logado' })
    }

    pool.query('DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuario_id])
    return res.json()
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
  } else if (tipo !== 'entrada' && tipo !== 'saida') {
    return res.status(400).json({ mensagem: 'Tipo de transação informada não é válida.' })
  }
  try {
    const categoriaExiste = await pool.query(
      'SELECT * FROM categorias WHERE id = $1',
      [categoria_id]
    )
    if (categoriaExiste.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Categoria informada é inválida.' })
    }

    const query = `INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) VALUES ($1, $2, $3, $4, $5, $6)RETURNING id, tipo, descricao, valor, data, usuario_id, categoria_id, (SELECT descricao FROM categorias WHERE id = $4) AS categoria_nome`
    const valores = [descricao, valor, data, categoria_id, req.usuario.id, tipo]

    const { rows } = await pool.query(query, valores)

    return res.status(201).json(rows[0])

  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno de servidor' })
  }
}

const detalharTransacao = async (req, res) => {
  const { id } = req.params

  try {
    const query = `SELECT transacoes.*, categorias.descricao as categoria_nome FROM transacoes LEFT JOIN categorias ON categoria_id = categorias.id WHERE transacoes.id = $1`
    const valores = [id]

    const { rows, rowCount } = await pool.query(query, valores)

    const resultado = rows[0]

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' })
    }
    if (resultado.usuario_id !== req.usuario.id) {
      return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    return res.status(200).json(resultado)

  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno de servidor' })
  }
}

const queryTotal = async (query, queryParam) => {
  const { rows } = await pool.query(query, queryParam)
  let response = rows[0].sum
  if (response === null) {
    response = 0
  }
  return response
}

const obterExtrato = async (req, res) => {
  try {
    const querySaida = `SELECT SUM(valor) FROM transacoes WHERE usuario_id = $1 AND tipo = 'saida'`
    const queryEntrada = `SELECT SUM(valor) FROM transacoes WHERE usuario_id = $1 AND tipo = 'entrada'`

    totalSaida = await queryTotal(querySaida, [req.usuario.id])
    totalEntrada = await queryTotal(queryEntrada, [req.usuario.id])

    const resultado = {
      entrada: totalEntrada,
      saida: totalSaida
    }

    return res.status(200).json(resultado)

  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno de servidor' })
  }
}

module.exports = { cadastrarTransacao, detalharTransacao, obterExtrato, exibirTransacoes, atualizarTransacao, excluirTransacao }
