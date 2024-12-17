import saveIcon from '../../images/saveButton.png';
import deleteIcon from '../../images/deleteButton.png';

export default function NewsCard({ article, onSave, onDelete, isLogged, keyword, tooltip }) {

    // Function to format date
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (error) {
            return 'Fecha no disponible';
        }
    };

    // Function to truncate description
    const truncateDescription = (description, maxLength = 120) => {
        if (!description) return '';
        return description.length > maxLength 
            ? description.slice(0, maxLength) + '...' 
            : description;
    };

    const handleSave = () => {
        const articleWithId = article.id 
            ? article 
            : { ...article, id: `${article.url}-${Date.now()}` };
        onSave(articleWithId);
    };

    return (
        <div className="card__container">
            <img 
                className="card__image" 
                src={article.urlToImage || 'https://s3-alpha-sig.figma.com/img/dac0/778e/82f1206f112335e2ee4d938ba64f02d6?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NNcP08d9u1F-CjuvQ9B9dnWkcZGJC5KlpOjqEACAiquVzPWcz-yIENzLhu1Mw6hR~FMKjbeSU6CyJFGcQnOYZpb6GuVMDTLWBITuS-7XsFG41n-zzC35k3OSxabO2P86yVcDpUk0TJJBCOBaH4Suq8STITDr2L29B-rvwuTRp8z3JLsq6DHPyZ9B7gE6~wnFhryoTN2wd0XoaUNxCIGSbEkKP6MojeNWXwcQ2dTa-dMn0~6ieBU0wHHoeSMoRo~kNdzb2esPM52uTW4XTVVrYjjWXoCqrhtQxqKMXxPKZarW4cjPN688slLdQ8F4kihg9k5fmRIGrUoO~6H~7WmMkQ__' } 
                alt={article.title || "imagen de noticia"}
            ></img>
            <div className="card__text-container">
                <p className="card__date">{formatDate(article.publishedAt)}</p>
                <p className="card__title">{article.title}</p>
                <p className="card__description">{truncateDescription(article.description)}</p>
                <p className="card__source">{article.source.name}</p>
            </div>
            <div className="card__topic-container">
                <p className={isLogged ? "card__topic-text" : "card__topic-text-hidden"}>{keyword}</p>
            </div>
            
            <div className="card__button-container">
                {!isLogged ? (
                    <img 
                        className="card__button-save" 
                        src={saveIcon} 
                        alt="icono de guardar" 
                        onClick={handleSave}
                    ></img>
                ) : (
                    <img 
                        className="card__button-delete" 
                        src={deleteIcon} 
                        alt="icono de eliminar" 
                        onClick={() => onDelete(article)}
                    ></img>
                )}
            </div>
            <div className="card__tooltip-container">
                <p className="card__tooltip">{isLogged ? 'Eliminar artículo de guardados' : 'Inicia sesión para guardar artículos'}</p>

            </div>
        </div>
    )
}



