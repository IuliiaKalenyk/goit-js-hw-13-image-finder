import css from './css/styles.css';
import cardsName from './templates/cards.hbs';
import NewsApiService from './js/apiService';
import getRefs from './js/get-refs';
/* import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core'; */
/* import './js/if'; */
/* import handleButtonClick from './js/if.js'; */
/* import './js/io'; */


const refs = getRefs();
console.log(refs.searchForm);

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);


function onSearch(e) {
  e.preventDefault();
   
  newsApiService.query = e.currentTarget.elements.query.value;
  console.log(newsApiService.query);
  if (newsApiService.query === '') {
    return alert('Введіть запит!');
  }
  newsApiService.resetPage();
  clearArticlesGallery();
  newsApiService.fetchArticles().then(appendArticlesMarkup);
 newsApiService.incrementPage();
  }

function appendArticlesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardsName(hits));
}
function clearArticlesGallery() {
  refs.gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    const hasQuery = newsApiService.query !== '';
    const isNextRequest = newsApiService.page > 1;
    if (entry.isIntersecting && hasQuery && isNextRequest) {
      console.log('Треба довантажити ще картинки');
      newsApiService.fetchArticles().then(appendArticlesMarkup);
      newsApiService.incrementPage();
    }
  });
};

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.myElementSelector);