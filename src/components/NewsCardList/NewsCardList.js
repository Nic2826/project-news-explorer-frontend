import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react';
import api from '../../utils/Api';

export default function NewsCardList({ 
    articles, 
    isLoggedUser = false, 
    onDeleteArticle,
    keyword,
    onUpdateArticles    
}) 

{
    const [currentPageSize, setCurrentPageSize] = useState(3);
    const showMoreButton = !isLoggedUser && articles.length < 12;

    

    const handleSeeMoreClick = async () => {
        try {
            // No permitas más de 12 artículos
            if (currentPageSize >= 12) {
                return;
            }
            
            const newPageSize = currentPageSize + 3;
            setCurrentPageSize(newPageSize);
            
            // Realiza la nueva búsqueda con el pageSize actualizado
            const newArticles = await api.fetchNews(keyword, newPageSize);
            // Aquí necesitarás una función para actualizar los artículos en el componente padre
            onUpdateArticles(newArticles);
            
        } catch (error) {
            console.log(error);
        }
    };


    // Si no hay artículos, mostrar mensaje
    if (!articles || articles.length === 0) {
        return (
            <div className="no-articles">
                {isLoggedUser 
                    ? "No tienes artículos guardados" 
                    : <NotFound />
                }
            </div>
        );
    }

    return (
        <div className='newsCardList'>
            <p className="newsCardList__title">{isLoggedUser ? "nada" : "Resultados de la búsqueda"}</p>
            <div className="newsCardList__card-container">
            {articles.map((article) => (
                <NewsCard 
                    key={article.id} 
                    article={article} 
                    isLogged={isLoggedUser}
                    onDelete={onDeleteArticle}
                    keyword={keyword} 
                />
            ))}
            </div>
            {showMoreButton && (
                <button 
                className={isLoggedUser ? "newsCardList__button-hidden" : "newsCardList__button"} 
                    onClick={handleSeeMoreClick} 
                    type='button'
                >
                    Ver más
                </button>
            )}
        </div>
    )
}