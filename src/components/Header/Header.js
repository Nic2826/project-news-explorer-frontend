
import outIcon from '../../images/Union.png'
import outIconWhite from '../../images/Union-white.png'
import Login from '../Login/Login'

export default function Header(props) {
  
  return (
    <header className="header"> 
      <p className="header__logo">NewsExplorer</p>

      <div className="header__container">
      <p className="header__text header__text-inicio">Inicio</p>
      <p className={`header__text-hidden ${props.isLogged ? "header__text header__text-saved": ""}`}>Artículos guardados</p>
      <button className="header__text-button" onClick={props.handleLogin}>{props.name}
        <img className={`header__outicon-hidden ${props.isLogged ? "header__outicon": ""}`} src={outIconWhite} alt='icono de salir'></img>
      </button>     
      </div>
    </header>
  )
}
