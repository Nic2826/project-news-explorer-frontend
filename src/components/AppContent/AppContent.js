import {  Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AppContent.css';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
import NotFound from '../NotFound/NotFound';
import NewsCardList from '../NewsCardList/NewsCardList';
import api from '../../utils/Api';
import RouteHandler from '../RouteHandler/RouteHandler';


function AppContent() {
  const [isLogged, setIsLogged] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isRouteSavedArticles, setIsRouteSavedArticles] = useState(false);
  const [name, setName] = useState('nic');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInfoPopUpOpen, setIsInfoPopUpOpen] = useState(false);
  

  const navigate = useNavigate();
  

  // Add useEffect to load saved articles from localStorage on component mount
  useEffect(() => {
    const savedArticlesFromStorage = localStorage.getItem('savedArticles');
    if (savedArticlesFromStorage) {
      setSavedArticles(JSON.parse(savedArticlesFromStorage));
    }
  }, []);

 // Nueva función para manejar la ruta
 const handleRouteChange = (pathname) => {
  setIsRouteSavedArticles(pathname === '/saved-news');
};

// Centralizar la lógica de login aquí
const handleLoginClick = () => {
    console.log('handleLoginClick ejecutado en App');
    if (isLogged) {
      console.log('Usuario logueado, haciendo logout');
      setIsLogged(false);
      setName('Iniciar sesión');
      navigate('/main'); // Now we can use navigate here
    } else {
      console.log('Usuario no logueado, abriendo login');
      setIsLoginOpen(true);
      setIsRegisterOpen(false);
    }
  };

// Close all popups
const handleCloseAllPopups = () => {
  setIsLoginOpen(false);
  setIsRegisterOpen(false);
};

// Handle successful login
const handleSubmitLogin = (e) => {
  e.preventDefault();
  setIsLoginOpen(false);
  setIsLogged(true);
  // navigate('/main');
};

// Handle register click
const handleRegisterClick = () => {
  setIsRegisterOpen(true);
  setIsLoginOpen(false);
};

  // Nueva función para guardar artículos
  const handleSaveArticle = (articleToSave) => {
    console.log('Article received in handleSaveArticle:', articleToSave); 
    const isAlreadySaved = savedArticles.some(
      (savedArticle) => savedArticle.url === articleToSave.url
    );

    if (!isAlreadySaved && isLogged) {
      // Asegurarnos de que usamos el keyword de búsqueda original
      const articleWithKeyword = {
        ...articleToSave,
        searchKeyword: searchKeyword, // Añadimos el keyword de búsqueda original
        id: `${articleToSave.url}-${Date.now()}`
      };
      console.log('Final article being saved:', articleWithKeyword); 
      const updatedSavedArticles = [...savedArticles, articleWithKeyword];
      setSavedArticles(updatedSavedArticles);
      localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
    }
};

  // Nueva función para eliminar artículos guardados
  const handleDeleteArticle = (articleToDelete) => {
    const updatedSavedArticles = savedArticles.filter(
      article => article.url !== articleToDelete.url
    );
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
  };

  const handleUpdateArticles = async (keyword, newPageSize) => {
    try {
      const newArticles = await api.fetchNews(keyword, newPageSize);
      const articlesWithIds = newArticles.map((article, index) => ({
        ...article,
        id: `${article.url}-${Date.now()}-${index}`
      }));
      setArticles(articlesWithIds);
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

  // Nueva función para hacer la búsqueda
  const handleSearch = async (keyword) => {
  setIsLoading(true);
  try {
    const validArticles = await api.fetchNews(keyword);
    const articlesWithIds = validArticles.map((article, index) => ({
      ...article,
      id: `${article.url}-${Date.now()}-${index}`
    }));
    setArticles(articlesWithIds);
    setSearchKeyword(keyword);
    setSearchError(null);
  } catch (error) {
    setSearchError(error.message);
    setArticles([]);
  } finally {
    setIsLoading(false);
  }
};

  // Modifica el renderContentAboveAbout
  const renderContentAboveAbout = () => {

    if (isLoading) {
      return <Preloader />;

    }
    if (searchKeyword && articles.length === 0) {
      return <NotFound />;
    }

    if (articles.length > 0) {
      return (
        <NewsCardList
          articles={articles}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
          onUpdateArticles={handleUpdateArticles}
          keyword={searchKeyword}
          isLogged={isLogged}
          savedArticles={savedArticles}
        />
      );
    } else {
      return null;
    }

  };

  function handleGitHubClick(){
    window.open('https://github.com/Nic2826', '_blank');
      }

      function handleLinkedinClick(){
        window.open('https://www.linkedin.com/in/nicollealgarin/', '_blank');
      }

  return (
    <div className="body">
      <div className="page__container">
        <RouteHandler onRouteChange={handleRouteChange} />
          <Routes>
            <Route path = "/" element={<Navigate replace to="/main"/>}></Route>
            <Route 
              path="/main"
              element={
                <>
                  <Main
                    onSearch={handleSearch}                    
                    isLoading={isLoading}
                    searchError={searchError}
                    isLogged={isLogged}
                    setIsLogged={setIsLogged}
                    isRouteSavedArticles={isRouteSavedArticles}
                    handleLoginClick={handleLoginClick}
                    name={name}
                    setName={setName}
                    isLoginOpen={isLoginOpen}
                    isRegisterOpen={isRegisterOpen}
                    onClosePopups={handleCloseAllPopups}
                    onSubmitLogin={handleSubmitLogin}
                    onRegisterClick={handleRegisterClick}
                    onSaveArticle={handleSaveArticle}
                    articles={articles}
                    onDeleteArticle={handleDeleteArticle}
                    onUpdateArticles={handleUpdateArticles}
                    searchKeyword={searchKeyword}
                  />
                  <div className="content-wrapper" style={{ position: 'relative' }}>
                    {renderContentAboveAbout()}
                    <div style={{
                      display: articles.length > 0 ? 'none' : 'block'
                    }}>
                      <About />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/saved-news"
              element={

                <SavedNews
                  articles={savedArticles}
                  isLogged={true}
                  onSaveArticle={handleSaveArticle}
                  onDeleteArticle={handleDeleteArticle}
                  keyword={searchKeyword}
                  isRouteSavedArticles={isRouteSavedArticles}
                  handleLoginClick={handleLoginClick}
                  username={name}
                />
              }
            />
          </Routes>
          <Footer 
          onGitHubClick={handleGitHubClick}
          onLinkedinClick={handleLinkedinClick}
          onInicioClick={handleLoginClick}/>
      </div>
      
    </div>
  );
}

export default AppContent;