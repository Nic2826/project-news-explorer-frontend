import saveIcon from '../../images/saveButton.png';
import saveIconBlue from '../../images/SaveIconBlue.png';
import deleteIcon from '../../images/deleteButton.png';
import { useState, useEffect } from 'react';

export default function NewsCard({ article, onSave, onDelete, isLogged, keyword, isRouteSavedArticles, savedArticles }) {

    const [isSaved, setIsSaved] = useState(false);

     // Verificar si el artículo ya está guardado
     useEffect(() => {
        const isArticleSaved = savedArticles?.some(
            savedArticle => savedArticle.url === article.url
        );
        setIsSaved(isArticleSaved);
    }, [article.url, savedArticles]);



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

    // Función para guardar el artículo
    const handleSave = (e) => {
        e.stopPropagation();

        if (isLogged && typeof onSave === 'function') {
            const articleToSave = {
                ...article,
                keyword: keyword
            };
            setIsSaved(true);
            onSave(articleToSave);
        } else {
            console.log('Cannot save article:', {
                isLogged,
                hasOnSaveFunction: typeof onSave === 'function'
            });
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (typeof onDelete === 'function') {
            onDelete(article);
        }
    };

    return (
        <div className="card__container">
            <img
                className="card__image"
                src={article.urlToImage || 'https://s3-alpha-sig.figma.com/img/dac0/778e/82f1206f112335e2ee4d938ba64f02d6?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NNcP08d9u1F-CjuvQ9B9dnWkcZGJC5KlpOjqEACAiquVzPWcz-yIENzLhu1Mw6hR~FMKjbeSU6CyJFGcQnOYZpb6GuVMDTLWBITuS-7XsFG41n-zzC35k3OSxabO2P86yVcDpUk0TJJBCOBaH4Suq8STITDr2L29B-rvwuTRp8z3JLsq6DHPyZ9B7gE6~wnFhryoTN2wd0XoaUNxCIGSbEkKP6MojeNWXwcQ2dTa-dMn0~6ieBU0wHHoeSMoRo~kNdzb2esPM52uTW4XTVVrYjjWXoCqrhtQxqKMXxPKZarW4cjPN688slLdQ8F4kihg9k5fmRIGrUoO~6H~7WmMkQ__'}
                alt={article.title || "imagen de noticia"}
            ></img>
            <div className="card__text-container">
                <p className="card__date">{formatDate(article.publishedAt)}</p>
                <p className="card__title">{article.title}</p>
                <p className="card__description">{truncateDescription(article.description)}</p>
                <p className="card__source">{article.source.name}</p>
            </div>
            <div className="card__topic-container">
                <p
                    className={isLogged && isRouteSavedArticles ? "card__topic-text" : "card__topic-text-hidden"}>
                    {article.searchKeyword || keyword}
                </p>
            </div>

            <div className="card__button-container">
                {isLogged && isRouteSavedArticles ? (
                    <img
                        className="card__button-delete"
                        src={deleteIcon}
                        alt="icono de eliminar"
                        onClick={handleDelete}
                    />
                ) : (
                    <img
                        className="card__button-save"
                        src={isSaved ? saveIconBlue : saveIcon}
                        alt="icono de guardar"
                        onClick={handleSave}
                    />
                )}
            </div>
            <div className="card__tooltip-container">
            <p className="card__tooltip">
                    {isLogged
                        ? (isRouteSavedArticles
                            ? 'Eliminar artículo de guardados'
                            : isSaved ? 'Artículo guardado' : 'Guardar artículo')
                        : 'Inicia sesión para guardar artículos'
                    }
                </p>

            </div>
        </div>
    )
}



