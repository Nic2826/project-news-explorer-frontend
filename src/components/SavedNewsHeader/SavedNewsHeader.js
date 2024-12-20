import { useMemo } from 'react';


export default function SavedNewsHeader({ articles, username = 'Nic' }) {  

  const formattedKeywords = useMemo(() => {
    if (!articles || articles.length === 0) return '';
    
    // Get unique keywords from saved articles
    const uniqueKeywords = [...new Set(articles.map(article => article.searchKeyword))]
      .filter(keyword => keyword)
      .sort();

    // Format keywords for display
    if (uniqueKeywords.length === 0) return '';
    if (uniqueKeywords.length === 1) return uniqueKeywords[0];
    if (uniqueKeywords.length === 2) return `${uniqueKeywords[0]} y ${uniqueKeywords[1]}`;
    


  const remainingCount = uniqueKeywords.length - 2;
    return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, y ${remainingCount} más`;
  }, [articles]);
  
  return (
    <div className="SavedNewsHeader__container">
        <p className="SavedNewsHeader__text-top" > Artículos guardados </p>
        <p className="SavedNewsHeader__text-middle"> 
            {username}, tienes {articles?.length || 0} artículos
            <br></br>
             guardados</p>
        <p className="SavedNewsHeader__text-bottom">Por palabras clave: 
          <span className="SavedNewsHeader__text-bottom SavedNewsHeader__keyword"> {' ' + formattedKeywords}</span>
        </p>
    </div>
  )
}
