import saveIcon from '../../images/saveButton.png';
import deleteIcon from '../../images/deleteButton.png';

export default function NewsCard() {
    return (
        <div className="card__container">
            <img className="card__image" src='https://s3-alpha-sig.figma.com/img/dac0/778e/82f1206f112335e2ee4d938ba64f02d6?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NNcP08d9u1F-CjuvQ9B9dnWkcZGJC5KlpOjqEACAiquVzPWcz-yIENzLhu1Mw6hR~FMKjbeSU6CyJFGcQnOYZpb6GuVMDTLWBITuS-7XsFG41n-zzC35k3OSxabO2P86yVcDpUk0TJJBCOBaH4Suq8STITDr2L29B-rvwuTRp8z3JLsq6DHPyZ9B7gE6~wnFhryoTN2wd0XoaUNxCIGSbEkKP6MojeNWXwcQ2dTa-dMn0~6ieBU0wHHoeSMoRo~kNdzb2esPM52uTW4XTVVrYjjWXoCqrhtQxqKMXxPKZarW4cjPN688slLdQ8F4kihg9k5fmRIGrUoO~6H~7WmMkQ__' alt="imagen de noticia"></img>
            <div className="card__text-container">
            <p className="card__date">4 de noviembre de 2020</p>
            <p className="card__title">Todo el mundo necesita un lugar de reflexión en la naturaleza.</p>
            <p className="card__description">Desde que leí el influyente libro de Richard Louv, "El último niño en el bosque", la idea de tener un "lugar de reflexión" especial para mi se me ha quedado grabada. Este consejo, que...</p>
            <p className="card__source">treehugger</p>
            </div>
            <div className="card__topic-container">
                <p className="card__topic-text">Naturaleza</p>
            </div>
            <div className="card__button-container">
                {/* <img className="card__button-save" src={saveIcon} alt="icono de guardar"></img> */}
                <img className="card__button-delete" src={deleteIcon} alt="icono de eliminar"></img>
                
            </div>
        </div>
    )
}
