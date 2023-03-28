import './styles.css';
import Logo from '../../assets/Logo.png'
import { useNavigate } from 'react-router-dom'
import Background from '../../assets/background_1.png'
import { useState } from 'react'
import { setItem } from '../../utils/storage';
import api from '../../services/api'



export default function LogIn() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (!email || !password) {
        setErrorMessage('Preencha todos os campos.');
        return
      }

      const response = await api.post('/login', {
        email,
        senha: password
      });
      const { token } = response.data;
      setItem('token', token);
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response.data.mensagem)
      return
    }
  }

  return (
    <div className='container' style={{ backgroundImage: `url(${Background})` }}>
      <img className='logo' src={Logo} alt="logo"></img>
      <div className='login-container'>
        <div className='side-text'>
          <h1>Controle suas <strong>finanças</strong>,
            sem planilha chata.</h1>
          <h2>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
          <button onClick={(e) => navigate('/sign-up')}>Cadastre-se</button>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          {errorMessage && <p>{errorMessage}</p>}
          <button>Entrar</button>
        </form>
      </div>
    </div>
  )
} 