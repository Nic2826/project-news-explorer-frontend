import { useState } from 'react';

export default function SearchForm({ onSearch, isLoading }) {
    const [keyword, setKeyword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearch(keyword);
    };

    const handleButtonClick = () => {
        onSearch(keyword);
    };

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <div className="search">
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
            </form>
            <button
                className="search-form__button"
                onClick={handleButtonClick}
                disabled={isLoading}
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
        </div>
    );
}