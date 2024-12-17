import close from '../../images/close.png'
import React, { useEffect, useRef } from 'react';

export default function PopUpWithForm(props) {

    const popupRef = useRef(null);

    useEffect(() => {
        // Manejador para la tecla Escape
        const handleEscClose = (e) => {
          if (e.key === 'Escape') {
            props.onClose();
          }
        };
    
        // Añadir event listener para la tecla Escape
        document.addEventListener('keydown', handleEscClose);
    
        // Limpieza del event listener cuando el componente se desmonte
        return () => {
          document.removeEventListener('keydown', handleEscClose);
        };
      }, [props.onClose]);
    
      // Manejador para clics fuera del popup
      const handleOverlayClick = (e) => {
        if (e.target === popupRef.current) {
          props.onClose();
        }
      };

    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay" onClick={handleOverlayClick} ref={popupRef}></div>
            <div className={`popup__content popup__content-${props.name}`}>
                <form 
                    onSubmit={props.onSubmit}
                    name={`${props.name}-form`} 
                    className="popup__admin">
                    <img 
                        src={close} 
                        alt="Close icon" 
                        className={`popup__close-icon popup__close-icon-${props.name}`} 
                        onClick={props.onClose}
                    />
                    <div>
                        <fieldset className="popup__container">
                            <h2 className="popup__heading">{props.title}</h2>
                            {props.children}
                            <button 
                                className={`popup__button-login popup__button-login-inactive ${props.isValid ? 'popup__button-login' : ''}`}
                                type="submit"                                
                            >
                                {props.buttonTextSubmit}
                            </button>

                            <button 
                                className="popup__button-bottom"
                                type="button"   
                                onRegisterClick={props.onRegisterClick}    
                                onLoginClick={props.onLoginClick} 
                                onClick={props.name === 'register-form' ? props.onLoginClick : props.onRegisterClick }                     
                            >
                                <span className="popup__input">o</span>
                               {props.buttonTextRegister }
                            </button>

                        </fieldset>
                    </div>
                </form>
            </div>
        </div>

    )
}