
import outIcon from '../../images/Union.png'
import outIconWhite from '../../images/Union-white.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Header({ isRouteSavedArticles, isLogged, name, handleLogin }) {

  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

function handleMenuHeaderClick(){
  setIsHeaderVisible(!isHeaderVisible);
}


  function handleSavedArticlesClick() {
    navigate('/saved-news');
    console.log(isLogged);
  }

  function handleInicioClick() {
    navigate('/project-news-explorer-frontend');
    console.log(isLogged);
  }


  return (
    <header className=
      {isRouteSavedArticles
        ? (isHeaderVisible 
          ? "header-black-celular header-black-hidden" 
          : "header-black ")
        : "header"}
    >
      <div className='header__container'>


        <p className={`
        ${isRouteSavedArticles
            ? "header__logo-black"
            : "header__logo"}
      `}>NewsExplorer</p>

        <div className={` 
          ${isRouteSavedArticles
              ? "header__container-text-black"
              : "header__container-text"}`}
              onClick={handleMenuHeaderClick}>
          <p className={` 
          ${isRouteSavedArticles
              ? "header__text header__text-black header__text-inicio-black"
              : "header__text header__text-inicio header__text-inicio-active"}`}
            onClick={handleInicioClick}>
            Inicio
          </p>
          <p
            className={
        !isLogged
                ? "header__text-hidden"
                : isRouteSavedArticles
                  ? "header__text header__text-black header__text-saved-black header__text-saved-active"
                  : "header__text header__text-saved"}
            onClick={handleSavedArticlesClick}>
            Artículos guardados
          </p>
          <button
            className={isRouteSavedArticles 
              ? "header__text-button-black" 
              : "header__text-button"}
            onClick={handleLogin}
          >
            {name}
            <img
              className={`header__outicon-hidden ${isLogged ? "header__outicon" : ""}`}
              src={isRouteSavedArticles ? outIcon : outIconWhite}
              alt='icono de salir'></img>
          </button>
        </div>
      </div>
      <span className={`
          ${isRouteSavedArticles
            ? "header__divider-black"
            : "header__divider"}`}></span>

      {/* div de celular ----------------------------------------------------------------------- */}

      <div className={` header__container-text-celular-hidden
          ${isHeaderVisible
            ? "header__container-text-celular"
            : "header__container-text-celular-hidden"}`}
            >
        <p className={` 
          ${isRouteSavedArticles
            ? "header__text-celular header__text-black-celular header__text-inicio-black-celular"
            : "header__text-celular header__text-inicio-celular header__text-inicio-active-celular"}`}
          onClick={handleInicioClick}>
          Inicio
        </p>
        <p
          className={`
        ${!isLogged
              ? "header__text-hidden-celular"
              : isRouteSavedArticles
                ? "header__text-celular header__text-black-celular header__text-saved-black-celular header__text-saved-active-celular"
                : "header__text-celular header__text-saved-celular"}
      `}
          onClick={handleSavedArticlesClick}>
          Artículos guardados
        </p>
        <button
          className={` ${isRouteSavedArticles ? "header__text-button-black-celular" : "header__text-button-celular"}`}
          onClick={handleLogin}
        >
          {name}
          <img
            className={`header__outicon-hidden-celular ${isLogged ? "header__outicon-celular" : ""}`}
            src={isRouteSavedArticles ? outIcon : outIconWhite}
            alt='icono de salir'></img>
        </button>
      </div>

    </header>

  )
}
