import { BrowserRouter } from 'react-router-dom';
import AppContent from '../AppContent/AppContent';

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;