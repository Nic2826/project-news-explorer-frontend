
import outIcon from '../../images/Union.png'
import outIconWhite from '../../images/Union-white.png'
import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';


export default function Header({ isRouteSavedArticles, isLogged, name, handleLogin }) {
  // const [isRouteSavedArticles, setIsRouteSavedArticles] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   setIsRouteSavedArticles(location.pathname === '/saved-news');
  // }, [location]);

  function handleSavedArticlesClick() {
    navigate('/saved-news');
    console.log(isLogged);
  }

  function handleInicioClick() {
    navigate('/main');
    console.log(isLogged);
  }


  return (
    <header className={`
      ${isRouteSavedArticles
        ? "header-black"
        : "header"}
    `}>
      <p className={`
        ${isRouteSavedArticles
          ? "header__logo-black"
          : "header__logo"}
      `}>NewsExplorer</p>

      <div className="header__container">
        <p className={` 
          ${isRouteSavedArticles 
          ? "header__text header__text-black header__text-inicio-black" 
          : "header__text header__text-inicio header__text-inicio-active"}`} 
          onClick={handleInicioClick}>
            Inicio
            </p>
        <p
          className={`
        ${!isLogged
              ? "header__text-hidden"
              : isRouteSavedArticles
                ? "header__text header__text-black header__text-saved-black header__text-saved-active"
                : "header__text header__text-saved"}
      `}
          onClick={handleSavedArticlesClick}>
          Artículos guardados
        </p>
        <button 
        className={` ${isRouteSavedArticles ? "header__text-button-black" : "header__text-button"}`} 
        onClick={handleLogin}
        >
        {name}
          <img 
          className={`header__outicon-hidden ${isLogged ? "header__outicon" : ""}`} 
          src={isRouteSavedArticles ? outIcon : outIconWhite} 
          alt='icono de salir'></img>
        </button>
      </div>
    </header>

  )
}
