import React, { useState } from 'react';
import newsApi from '../../utils/Api';
import Preloader from '../Preloader/Preloader';

export default function SearchForm({ onSearchResults, onError, load }) {
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(load);
    
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setIsLoading(true);
        try {
            onError(null);

            console.log('que valor tiene setisloading en searchoform?', isLoading);

            const articles = await newsApi.fetchNews(keyword);
            // Pasa tanto los artículos como el keyword
            onSearchResults(articles, keyword);
            
        } catch (error) {
            onError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <form 
            className="search-form__container" 
            onSubmit={handleSubmit}
        >
            <input
                id="search-input"
                className="search-form__text"
                type="text"
                placeholder="Introduce un tema"
                required
                value={keyword}
                onChange={handleChange}
                name="search-form"
                disabled={isLoading}
            />

            <button 
                className="search-form__button" 
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
            
        </form>
    );
}







































// import React, { useState } from 'react';
// import newsApi from '../../utils/Api';

// export default function SearchForm({ onSearchResults, onError, load }) {
//     const [keyword, setKeyword] = useState('');
//     const [isLoading, setIsLoading] = useState(load);

    
//     const handleSubmit = async (event) => {
//         event.preventDefault(); 
//         setIsLoading(true);
//         try {
            
//             onError(null);

//             console.log('que valor tiene setisloading en searchoform?', isLoading);

//             const articles = await newsApi.fetchNews(keyword);
//             // onSubmit(); 
//             onSearchResults(articles);
            
//         } catch (error) {
//             onError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (event) => {
//         setKeyword(event.target.value);
        
//     };

//     return (
//         <form 
//             className="search-form__container" 
//             onSubmit={handleSubmit}
//         >
//             <input
//                 id="search-input"
//                 className="search-form__text"
//                 type="text"
//                 placeholder="Introduce un tema"
//                 required
//                 value={keyword}
//                 onChange={handleChange}
//                 name="search-form"
//                 disabled={isLoading}
//             />

//             <button 
//                 className="search-form__button" 
//                 type="submit"
//                 disabled={isLoading}
//             >
//                 {isLoading ? 'Buscando...' : 'Buscar'}
//             </button>
//         </form>
//     )
// }

