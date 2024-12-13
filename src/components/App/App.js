import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App';
import Main from '../Main/Main';
import Login from '../Login/Login'
import Register from '../Register/Register'
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NotFound from '../NotFound/NotFound';

import NewsCardList from '../NewsCardList/NewsCardList';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { currentUser } from '../../utils/CurrentUser';

function App() {
  return (
    <div className="body">
      <div className="page__container">
        {/* <CurrentUserContext.Provider value={currentUser}> */}
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<Main />} />

          </Routes>
          <Preloader />
          <About />
          
          <NotFound />
          <SavedNewsHeader />    
          
          <NewsCardList />

          <Footer />
        </BrowserRouter>

        {/* </CurrentUserContext.Provider> */}
      </div>
    </div>
  );
}

export default App;
