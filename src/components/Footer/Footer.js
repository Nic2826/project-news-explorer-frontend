import React from 'react'
import GitHub from '../../images/github.png'
import Linkedin from '../../images/linkedinLogo.png'

export default function Footer({ onGitHubClick, onLinkedinClick,onInicioClick }) {

  
  return (
    <footer className="footer">
        <p className="footer__copyright">&copy; 2024 Nicolle Algarín</p>
        <div className="footer__links-container">
          <a className="footer__link" onClick={onInicioClick}>Inicio</a>
          <a className="footer__link" href="https://tripleten.com/home/web/" target="_blank" rel="noreferrer">Tripleten</a>  
          <div className="footer__links-logo-container">
          <img className="footer__link-logo" src={GitHub} alt="logo GitHub" onClick={onGitHubClick}/>
          <img className="footer__link-logo" src={Linkedin} alt="logo Linkedin" onClick={onLinkedinClick}/>
        </div>
        </div>
      </footer>
  )
}
