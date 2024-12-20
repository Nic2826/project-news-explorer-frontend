import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteHandler({ onRouteChange }) {
    const location = useLocation();
  
    useEffect(() => {
      onRouteChange(location.pathname);
    }, [location, onRouteChange]);
  
    return null;
  }

  export default RouteHandler;