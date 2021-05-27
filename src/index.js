import css from './css/styles.css';
import cardsName from './templates/cards.hbs';
import cardsList from './templates/cardsList.hbs'
import debounce from 'lodash.debounce';
import API from './js/api-service';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const refs = getRefs();
console.log(refs.cards);

refs.input.addEventListener('input', debounce(onSearch, 500));

let searchQuery = '';

function onSearch(e) {
  searchQuery = e.target.value.trim();
  console.log(searchQuery)
  refs.cards.innerHTML = '';
  if (!searchQuery) {
    return;
  } else {
    API.fetchCountry(searchQuery)
      .then(specificNameNotification)
      .catch(onFetchError);
  }
}

function renderCountryCard(countres) {
  const murkup = cardsName(countres);
    console.log(murkup);
  refs.cards.insertAdjacentHTML('beforeend', murkup);
}
function renderCountryList(countres) {
  const murkupList = cardsList(countres);
  refs.cards.insertAdjacentHTML('beforeend', murkupList);
  }
 
function onFetchError(error) {
  
  alert('Трабли, такої країни не має...');
}
function specificNameNotification(countres) {
  if (countres.length > 10) {
     error({
      text: 'Too many matches found. Please enter a more specific query!',
     });
    return;
  }
  if (countres.length >= 2 && countres.length <= 10) {
    renderCountryList(countres);
    return;
  }
  renderCountryCard(countres);
}


