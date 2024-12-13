import NotFoundImage from '../../images/not-found.png'

export default function NotFound() {
  return (
    <div className="NotFound__container">
        <img className="NotFound__image" src={NotFoundImage} alt="imagen de not found"></img>
        <p className="NotFound__title">No se encontró nada</p>
        <p className="NotFound__text">
            Lo sentimos, pero no hay nada que coincida 
            <br></br>
            con tus términos de búsqueda.</p>
        
    </div>
  )
}
