

export default function SearchForm() {
    return (
        <div className="search-form__container">

            <input
                id="search-input"
                className="search-form__text"
                type="text"
                placeholder="Introduce un tema"
                required
                // value={formData.email}
                // onChange={handleChange}
                name="search-form"
            />

            <button className="search-form__button">Buscar</button>

        </div>
    )
}
