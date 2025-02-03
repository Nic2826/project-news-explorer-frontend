import { BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AppContent from '../AppContent/AppContent';


function App() {
  return (
    <div className="body">

      <CurrentUserContext.Provider value={currentUser}>

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>

      </CurrentUserContext.Provider>

    </div>

  );
}

export default App;