import NewsCard from '../NewsCard/NewsCard';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

export default function NewsCardList({
    articles,
    isLogged,
    onDeleteArticle,
    onSaveArticle,
    keyword = '',
    onUpdateArticles,
    savedArticles
}) {
    const [currentPageSize, setCurrentPageSize] = useState(3);
    const showMoreButton = articles.length < 12;
    const location = useLocation();
    const isRouteSavedArticles = location.pathname === '/saved-news';


    const handleSeeMoreClick = async () => {

        console.log(isLogged);
        try {
            if (currentPageSize >= 12) {
                return;
            }

            const newPageSize = currentPageSize + 3;
            setCurrentPageSize(newPageSize);

            onUpdateArticles(keyword, newPageSize);
        } catch (error) {
            console.log(error);
        }
    };

    // Si no hay artículos, mostrar mensaje
    if (!articles || articles.length === 0) {
        return (
            <div className="no-articles">
                {isRouteSavedArticles
                    ? <NotFound />
                    : null
                }
            </div>
        );
    }

    return (
        <div className='newsCardList'>
            <p className="newsCardList__title">

                {isLogged
                    ? (isRouteSavedArticles
                        ? ''
                        : 'Resultados de la búsqueda')
                    : 'Resultados de la búsqueda'
                }

            </p>
            <div className="newsCardList__card-container">
                {articles.map((article) => (
                    <NewsCard
                        key={article.id}
                        article={article}
                        isLogged={isLogged}
                        onDelete={onDeleteArticle}
                        onSave={onSaveArticle}
                        keyword={article.searchKeyword || keyword}
                        isRouteSavedArticles={isRouteSavedArticles}
                        savedArticles={savedArticles}
                    />
                ))}
            </div>

            <button
                className=
                {showMoreButton ?
                    (isRouteSavedArticles
                        ?"newsCardList__button-hidden"
                        : "newsCardList__button"
                    )
                    : "newsCardList__button" }
                onClick={handleSeeMoreClick}
                type='button'
            >
                Ver más
            </button>

        </div>
    )
}