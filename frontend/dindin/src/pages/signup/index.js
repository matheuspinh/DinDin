import './styles.css';
import Logo from '../../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Background from '../../assets/background_1.png'
import api from '../../services/api'
import { useState } from 'react';



export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (!name || !email || !password || !passwordConfirm) {
        setErrorMessage('Preencha todos os campos')
        return
      }
      if (password !== passwordConfirm) {
        setErrorMessage('As senhas digitadas não são idênticas')
        return
      }
      const requisition = await api.post('/usuario', {
        email,
        nome: name,
        senha: password
      })
      navigate('/login')
    } catch (err) {
      setErrorMessage(err.response.data.mensagem)
      return
    }

  }

  return (
    <div className='container' style={{ backgroundImage: `url(${Background})` }}>
      <img className='logo' src={Logo} alt="logo"></img>
      <div className='signup-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <label>Confirmação de senha</label>
          <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></input>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button>Cadastrar</button>
          <p>Já tem cadastro? <Link to='/login'>Clique aqui</Link>!</p>
        </form>
      </div>
    </div>
  )
}