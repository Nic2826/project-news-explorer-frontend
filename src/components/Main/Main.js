// import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NewsCardList from '../NewsCardList/NewsCardList';
// import PopUpInfo from '../PopUpInfo/PopUpInfo';

export default function Main({ onSearch, 
  isLoading, 
  searchError,  
  isLogged, 
  isRouteSavedArticles,
  handleLoginClick,
  name,
  isLoginOpen,
  isRegisterOpen,
  onClosePopups,
  onSubmitLogin,
  onRegisterClick,
  onSaveArticle,
  articles,
  onDeleteArticle,
  onUpdateArticles,
  searchKeyword }) {

    

  // const [isInfoPopUpOpen, setIsInfoPopUpOpen] = useState(false);
 

  return (
    <div className="main">
      <Header
        isLogged={isLogged}
        handleLogin={handleLoginClick}
        name={name}
        isRouteSavedArticles={isRouteSavedArticles} 
      />

      <div className='main__content'>
        <h1 className='main__title'>¿Qué está pasando en el mundo?</h1>
        <p className='main__text'>
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>
      </div>

      <SearchForm
        onSearch={onSearch}
        isLoading={isLoading}
        searchError={searchError}
        isLogged={isLogged}
      />

      {isLoginOpen &&
        <Login
        onClose={onClosePopups}
        isOpen={isLoginOpen}
        onLoginSubmit={onSubmitLogin}
        onRegisterClick={onRegisterClick}
        />
      }

      {isRegisterOpen &&
        <Register
        onClose={onClosePopups}
        isOpen={isRegisterOpen}
        onLoginClick={handleLoginClick}
        />
      }

      {/* {isInfoPopUpOpen && <PopUpInfo />} */}

    </div>
  );
}



