import { useNavigate, Navigate } from 'react-router-dom';
import {useEffect} from 'react';
export default function ProtectedRoute({ component: Component, ...rest }) {
//revisar las rutas de protected route cuando implemente el login
  const navigate = useNavigate();

  useEffect(() => {
    function checkToken(){
      const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/project-news-explorer-frontend');
    }
    }
    checkToken();
      },[navigate])

      const token = localStorage.getItem('jwt');
  return token ? <Component {...rest} /> : <Navigate to="/project-news-explorer-frontend" />;
  
}
