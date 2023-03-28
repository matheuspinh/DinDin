import { getItem } from '../../utils/storage'
import './styles.css'
import api from '../../services/api'
import { useState } from 'react'

export default function EditProfile({ handleModalActive, user, setUser }) {
  const [name, setName] = useState(user.nome)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = getItem('token')
      if (!name || !email || !password || !passwordConfirm) {
        console.log('Preencha todos os campos')
        return
      }
      if (password !== passwordConfirm) {
        console.log('As senhas digitadas não são idênticas')
        return
      }
      const response = await api.put('/usuario', {
        email,
        nome: name,
        senha: password
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setUser({ ...user, nome: name, email })
      handleModalActive(e)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <form className="input-fields" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <label>E-mail</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <label>Confirmação de senha</label>
        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></input>
        <button>Confirmar</button>
      </form>
    </div>
  )
}