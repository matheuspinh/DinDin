const pool = require('../conexao')

const exibirCategorias = async (req, res) => {
    try {
        const categorias = await pool.query('SELECT * FROM categorias');
        return res.json(categorias.rows)
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    exibirCategorias
}