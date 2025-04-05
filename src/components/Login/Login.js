import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { login, checkToken } from '../../utils/auth';
import PopUpWithForm from '../PopUpWithForm/PopUpWithForm';

export default function Login({ isOpen, onClose,  onLoginSubmit, onRegisterClick}) {
  const inputRef = useRef();
  const currentUser = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });



  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  
  const { setCurrentUser } = useContext(CurrentUserContext) || {};
  const navigate = useNavigate();


  useEffect(() => {
    if (isOpen && currentUser?.email && currentUser?.password) {
      setFormData({
        name: currentUser.email,
        about: currentUser.password
      });
      setErrors({});
    }
  }, [isOpen, currentUser]);



  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      return 'Este campo es obligatorio.';
    }
    if (value.length < 6 && name !== 'email') {
      return `El campo ${name} debe tener al menos 6 caracteres.`;
    }
    if (value.length > 30) {
      return `El campo ${name} no puede tener más de 30 caracteres.`;
    }

    if (name === 'email') {
      if (!value.includes('@')) {
        return 'Introduce un correo electrónico válido';
      }
    }

    return '';
  };


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      email: validateField('name', formData.email),
      password: validateField('about', formData.password)
    };
    
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onLoginSubmit(formData);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = !Object.values(errors).some(error => error) && 
                 formData.email.length >= 2 && 
                 formData.password.length >= 2;



// hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh


  // Token validation on mount
  useEffect(() => {
    async function reviewToken() {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      try {
        const response = await checkToken(token);
        if (response.user) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error validando el token:', error.message);
        navigate('/project-news-explorer-frontend');
      }
    }
    
    reviewToken();
  }, [navigate]);



  return (
    
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="login-form"
      title="Iniciar Sesión"
      buttonTextSubmit={isSubmitting ? "Cargando..." : "Iniciar Sesión"}
      buttonTextRegister={" inscribirse"}
      isValid={isValid}
      onRegisterClick={onRegisterClick}
    >

      <p className="popup__label">Correo electrónico</p>

      <input 
        id="email-input" 
        className={`popup__input popup__input-login ${errors.email ? 'popup__input-error' : ''}`}
        type="email" 
        placeholder="Introduce tu correo electrónico"
        required 
        value={formData.email}
        onChange={handleChange}
        name="email" 
      />

      <div className="popup__line"></div>
      <span className="popup__input-error">
        {errors.email}
      </span>

      <p className="popup__label">Contraseña</p>

      <input 
        id="password-input" 
        className={`popup__input popup__input-login ${errors.password ? 'popup__input-error' : ''}`}
        type="password"
        placeholder="Introduce tu contraseña" 
        required 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        minLength="6"
      />

      <div className="popup__line"></div>
      <span className="popup__input-error">
        {errors.password}
      </span>

      {errors.submit && (
        <span className="popup__input-error popup__submit-error">
          {errors.submit}
        </span>
      )}

      
    </PopUpWithForm>
  );
}