import React, { useState, useEffect } from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import AppContent from '../AppContent/AppContent';
import api from '../../utils/Api.js';


function App() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  // Optional: Add useEffect to fetch user data or perform initial setup
  useEffect(() => {
    // Example: Fetch current user if token exists
    const token = localStorage.getItem('token');
    if (token) {
      // Implement a method to fetch user data
      api.getCurrentUser()
        .then(userData => {
          setCurrentUser(userData);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token'); // Remove invalid token
        });
    }
  }, []);

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