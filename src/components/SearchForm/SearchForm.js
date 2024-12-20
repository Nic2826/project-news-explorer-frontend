import { useState } from 'react';

export default function SearchForm({ onSearch, isLoading }) {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearch(keyword);
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































