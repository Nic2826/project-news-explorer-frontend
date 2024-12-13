import close from '../../images/close.png'

export default function PopUpWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay"></div>
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
                                {props.buttonText}
                            </button>

                            <button 
                                className="popup__button-bottom"
                                type="submit"                                
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