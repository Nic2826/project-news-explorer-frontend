import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
// import Login from '../Login/Login'
// import Register from '../Register/Register'

export default function Main() {
  return (

    <div className="main">
      
      <Header />
      <div className='main__content'>
        <h1 className='main__title'>¿Qué está pasando
          en el mundo? </h1>
        <p className='main__text'> Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</p>
        <div>
        </div>

        {/* <Login/>
          <Register/> */}

      </div>

      <SearchForm />
    </div>
  )
}
