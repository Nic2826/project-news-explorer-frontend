import PopUpWithForm from "../PopUpWithForm/PopUpWithForm"
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { login, checkToken } from '../../utils/auth';

export default function Register({ isOpen, onClose, onRegisterSubmit, onLoginClick }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isValid, setIsValid] = useState(false);
      
      const { setCurrentUser } = useContext(CurrentUserContext) || {};
      const navigate = useNavigate();
    
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
          }
        }
        
        reviewToken();
      }, [navigate]);
    


      // Form validation
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
        setIsSubmitting(true);
    
        try {
          await login(formData.email, formData.password, formData.username);
          if (setCurrentUser) {
            setCurrentUser({
              email: formData.email,
              isLoggedIn: true
            });
          }
          navigate('/');
        } catch (err) {
          setErrors(prev => ({
            ...prev,
            submit: 'Error al inscribirse.'
          }));
        } finally {
          setIsSubmitting(false);
        }
      };


  return (
        <PopUpWithForm
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          name="register-form"
          title="Inscribirse"
          buttonTextSubmit={isSubmitting ? "Cargando..." : "Inscribirse"}
          buttonTextRegister={" Iniciar Sesión"}
          isValid={isValid}
          onLoginClick={onLoginClick}
        >
          <p className="popup__label">Correo electrónico</p>
    
          <input 
            id="email-input" 
            className={`popup__input  ${errors.email ? 'popup__input-error' : ''}`}
            type="email" 
            placeholder="Introduce tu correo electrónico"
            required 
            value={formData.email}
            onChange={handleChange}
            name="email" 
          />

          <span className="popup__input-error">
            {errors.email}
          </span>
    
          <p className="popup__label">Contraseña</p>
    
          <input 
            id="password-input" 
            className={`popup__input  ${errors.password ? 'popup__input-error' : ''}`}
            type="password"
            placeholder="Introduce tu contraseña" 
            required 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            minLength="6"
          />
    
          <span className="popup__input-error">
            {errors.password}
          </span>

          <p className="popup__label">Nombre de usuario</p>
    
          <input 
            id="username-input" 
            className={`popup__input  ${errors.username ? 'popup__input-error' : ''}`}
            type="text" 
            placeholder="Introduce tu nombre de usuario"
            required 
            value={formData.name}
            onChange={handleChange}
            name="username" 
          />

          <span className="popup__input-error">
            {errors.username}
          </span>
    
          {errors.submit && (
            <span className="popup__input-error popup__submit-error">
              {errors.submit}
            </span>
          )}
        </PopUpWithForm>
      
  )
}
