import PopUpWithForm from "../PopUpWithForm/PopUpWithForm"
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { login, checkToken } from '../../utils/auth';

export default function Register({ isOpen, onClose }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
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
            navigate('/signin');
          }
        }
        
        reviewToken();
      }, [navigate]);
    
      // Form validation
      useEffect(() => {
        const isFormValid = 
          formData.email?.length > 0 && 
          formData.password?.length > 0 && 
          Object.keys(errors).length === 0;
        
        setIsValid(isFormValid);
      }, [formData, errors]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
    
        // Basic validation
        let newErrors = { ...errors };
        if (name === 'email') {
          if (!value.includes('@')) {
            newErrors.email = 'Introduce un correo electrónico válido';
          } else {
            delete newErrors.email;
          }
        }
        if (name === 'password') {
          if (value.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
          } else {
            delete newErrors.password;
          }
        }
        setErrors(newErrors);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
          await login(formData.email, formData.password);
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
            submit: 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
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
          buttonText={isSubmitting ? "Cargando..." : "Inscribirse"}
          buttonTextRegister={isSubmitting ? "Cargando..." : " Iniciar Sesión"}
          isValid={isValid && !isSubmitting}
        >
          <label className="popup__label">Correo electrónico</label>
    
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
    
          <div className="popup__line"></div>
          <span className="popup__input-error">
            {errors.email}
          </span>
    
          <label className="popup__label">Contraseña</label>
    
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
    
          <div className="popup__line"></div>
          <span className="popup__input-error">
            {errors.password}
          </span>

          <label className="popup__label">Nombre de usuario</label>
    
          <input 
            id="name-input" 
            className={`popup__input  ${errors.email ? 'popup__input-error' : ''}`}
            type="text" 
            placeholder="Introduce tu nombre de usuario"
            required 
            value={formData.name}
            onChange={handleChange}
            name="name" 
          />
    
          <div className="popup__line"></div>
          <span className="popup__input-error">
            {errors.name}
          </span>
    
          {errors.submit && (
            <span className="popup__input-error popup__submit-error">
              {errors.submit}
            </span>
          )}
        </PopUpWithForm>
      
  )
}
