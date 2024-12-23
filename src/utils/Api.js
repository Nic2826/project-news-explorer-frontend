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