import Logo from '../../assets/Logo.png'
import Profile from '../../assets/profile.png'
import LogoutIcon from '../../assets/logout.png'
import './styles.css'
import { clear } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function Header({ user, handleModalActive }) {
  const navigate = useNavigate()

  function handleLeave(e) {
    e.preventDefault();
    console.log('click')
    clear();
    navigate('/login')
  }

  return (
    <div className="header-container">
      <img className="logo" src={Logo} alt="logo"></img>
      <div>
        <img onClick={(e) => handleModalActive(e, 'editProfile')} src={Profile} alt="ícone perfil"></img>
        <h3>{user.nome}</h3>
        <img src={LogoutIcon} alt="sair" onClick={handleLeave}></img>
      </div>
    </div >
  )
}