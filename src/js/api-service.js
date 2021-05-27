const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountry(searchCountres) {
  return fetch(`${BASE_URL}/name/${searchCountres}`)
        .then(response => response.json(),);
}
export default { fetchCountry };