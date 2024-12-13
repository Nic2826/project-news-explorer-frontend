
import outIcon from '../../images/Union.png'
import outIconWhite from '../../images/Union-white.png'

export default function Header(props) {
  
  return (
    <header className="header"> 
      <p className="header__logo">NewsExplorer</p>

      <div className="header__container">
      <p className="header__text">Inicio</p>
      <p className="header__text">Artículos guardados</p>
      <button className="header__text-button">Iniciar sesión
        <img className="header__outicon" src={outIconWhite} alt='icono de salir'></img>
      </button>      
      </div>
    </header>
  )
}
