import { formatDate } from './formatDate';
class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.apiKey = 'a4bdb6282888411298fe461bde7d9688';
    }

    // Validate search input
    validateSearchInput(keyword) {
        if (!keyword || keyword.trim() === '') {
            throw new Error('Por favor, introduzca una palabra clave');
        }
        return keyword.trim();
    }


    getDateRange() {
        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - 7);
    
        return {
          from: formatDate(from), // You'll need to implement this utility function
          to: formatDate(to)
        };
      }


// Fetch news articles
async fetchNews(keyword, pageSize = 3) {
    try {
      // Validate keyword
      const validatedKeyword = this.validateSearchInput(keyword);

      // Get date range
      const { from, to } = this.getDateRange();

      // Construct URL with parameters
      const url = new URL(`${this.baseUrl}/everything`);
      url.searchParams.set('q', validatedKeyword);
      url.searchParams.set('apiKey', this.apiKey);
      url.searchParams.set('from', from);
      url.searchParams.set('to', to);
      url.searchParams.set('pageSize', pageSize.toString());

      // Fetch news
      const response = await fetch(url.toString());

      // Handle network or response errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse and return news data
      const data = await response.json();
      return data.articles || [];

    } catch (error) {
      // Handle different types of errors
      if (error.message === 'Por favor, introduzca una palabra clave') {
        throw error; // Re-throw validation error
      }
      console.error('Error fetching news:', error);
      throw new Error('No se pudieron cargar las noticias. Intente de nuevo.');
    }
  }



// Método GET para obtener artículos
async getArticles() {
  try {
    const url = `${this.baseUrl}/articles`; // Ajusta la URL según tu configuración
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asume que guardas el token de autenticación
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('No se pudieron cargar los artículos.');
  }
}

// Método POST para crear un artículo
async createArticle(articleData) {
  try {
    const url = `${this.baseUrl}/articles`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(articleData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('No se pudo crear el artículo.');
  }
}

// Método POST para inicio de sesión
async signin(credentials) {
  try {
    const url = `${this.baseUrl}/signin`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Guardar el token de autenticación
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error('No se pudo iniciar sesión.');
  }
}
}


const api = new Api({
    baseUrl: "https://newsapi.org/v2",
    headers: {
        authorization: "a4bdb6282888411298fe461bde7d9688",
        "Content-Type": "application/json",
    },
    groupId: "web_es_11",
});



export default api;