import React from 'react'
import GitHub from '../../images/github.png'
import facebok from '../../images/fb.png'

export default function Footer({ onGitHubClick }) {

  
  return (
    <footer className="footer">
        <p className="footer__copyright">&copy; 2024 Nicolle Algarín</p>
        <div className="footer__links">
          <a className="footer__link" href="https://tripleten.com/home/web/" target="_blank" rel="noreferrer">Inicio</a>
          <a className="footer__link" href="https://tripleten.com/home/web/" target="_blank" rel="noreferrer">Tripleten</a>
          <img className="footer__link" src={GitHub} alt="logo GitHub" onClick={onGitHubClick}/>
          <img className="footer__link" src={facebok} alt="logo facebok" />
        </div>
      </footer>
  )
}
