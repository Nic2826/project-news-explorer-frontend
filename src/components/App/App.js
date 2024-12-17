import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NotFound from '../NotFound/NotFound';
import NewsCardList from '../NewsCardList/NewsCardList';
import api from '../../utils/Api';


function App({load, handleSearchSubmit,handleSearchResults, keyword }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(''); 

  load = false;

// Función para actualizar los artículos
const handleUpdateArticles = (newArticles) => {
  setArticles(newArticles);
};



  console.log('este es el valor que viene de searcfhifmr para el load', load);

  function handleSearchResults(searchedArticles, keyword) {
    const articlesWithIds = searchedArticles.map((article, index) => ({
      ...article,
      id: `${article.url}-${Date.now()}-${index}`
    }));
    setArticles(articlesWithIds);
    setSearchKeyword(keyword); // Guarda el keyword
    setSearchError(null);
    setIsLoading(false);
  }

  function handleSearchError(error) {
    setArticles([]);
    setSearchError(error);
    setIsLoading(false);
  }

  function handleSearchSubmit() {
    
    setIsLoading(true);
    console.log('Buscandoooooo...');
    console.log('set is loading isss', isLoading);
  }



  function handleSaveArticle(article) {
    const articleWithId = {
      ...article,
      id: article.id || `${article.url}-${Date.now()}`
    };
    
    if (!savedArticles.some(saved => saved.id === articleWithId.id)) {
      setSavedArticles([...savedArticles, articleWithId]);
    }
  }

  function handleDeleteArticle(article) {
    setSavedArticles(savedArticles.filter(saved => saved.id !== article.id));
  }

  // Función auxiliar para determinar qué mostrar encima del About
  const renderContentAboveAbout = () => {
    if (isLoading) {
      return <Preloader />;
    }
    
    if (articles.length > 0) {
      return (
        <NewsCardList 
          articles={articles}
          onLoggedArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
          keyword={searchKeyword}
          onUpdateArticles={handleUpdateArticles}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="body">
      <div className="page__container">
        <BrowserRouter>
          <Routes>
            <Route 
              path="/main" 
              element={
                <>
                  <Main 
                    onSearchResults={handleSearchResults}
                    onSearchError={handleSearchError}
                    onSearchSubmit={handleSearchSubmit}
                    load={load}
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
          </Routes>
          
          {isLoading? console.log("esta cargadno es true",isLoading): console.log("esta cargadno es false",isLoading)}
          {/* <About /> */}
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;























































// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import './App';
// import Main from '../Main/Main';
// import Login from '../Login/Login'
// import Register from '../Register/Register'
// import About from '../About/About';
// import Footer from '../Footer/Footer';
// import Preloader from '../Preloader/Preloader';
// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
// import NotFound from '../NotFound/NotFound';

// import NewsCardList from '../NewsCardList/NewsCardList';
// // import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// // import { currentUser } from '../../utils/CurrentUser';



// function App() {

// return (
//     <div className="body">
//       <div className="page__container">
//         {/* <CurrentUserContext.Provider value={currentUser}> */}
//         <BrowserRouter>
//           <Routes>
//             <Route path="/main" element={<Main />} />

//           </Routes>

//           {/* <Preloader /> */}
//           <About />

//           {/* <NotFound /> */}
//           {/* <SavedNewsHeader /> */}

//           {/* <NewsCardList /> */}

//           <Footer />
//         </BrowserRouter>

//         {/* </CurrentUserContext.Provider> */}
//       </div>
//     </div>
//   );
// }

// export default App;
