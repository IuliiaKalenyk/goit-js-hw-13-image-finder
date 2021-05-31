const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '21813643-16e9f0b30c26c932714b1b168';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
}
  fetchArticles() {
    console.log(this);
    return fetch(`${BASE_URL}${KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
   this.page += 1;
}

  resetPage() {
    this.page = 1;
  }
  
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}





