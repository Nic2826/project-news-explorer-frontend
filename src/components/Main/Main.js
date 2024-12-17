import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PopUpInfo from '../PopUpInfo/PopUpInfo';

export default function Main({ onSearchError, handleSearchSubmit, load, onSearchResults }) {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState('Iniciar sesión');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInfoPopUpOpen, setIsInfoPopUpOpen] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState('');
  
  const navigate = useNavigate();

  const handleSearch = (articles, keyword) => {
    setCurrentKeyword(keyword);
    onSearchResults(articles, keyword); // Pasa tanto los artículos como el keyword
  };

  function handleLoginClick() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  }

  function CloseAllPopUps() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    setIsLoginOpen(false);
    setIsLogged(true);
    navigate('/');
  }

  function handleRegisterClick() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }

  return (
    <div className="main">
      <Header
        isLogged={isLogged}
        handleLogin={handleLoginClick}
        name={name}
      />

      <div className='main__content'>
        <h1 className='main__title'>¿Qué está pasando en el mundo?</h1>
        <p className='main__text'>
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>
      </div>

      <SearchForm 
        onSearchResults={handleSearch}
        onError={onSearchError}
        onSubmit={handleSearchSubmit}
        load={load}
      />

      {isLoginOpen && 
        <Login 
          onClose={CloseAllPopUps}
          isOpen={isLoginOpen}
          onLoginSubmit={handleSubmitLogin}
          onRegisterClick={handleRegisterClick}
        />
      }

      {isRegisterOpen && 
        <Register 
          onClose={CloseAllPopUps}
          isOpen={isRegisterOpen}
          onLoginClick={handleLoginClick}
        />
      }

      {isInfoPopUpOpen && <PopUpInfo />}
    </div>
  );
}



