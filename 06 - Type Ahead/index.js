const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


//Fetching
const cities = [];
fetch(endpoint)
    .then(data => data.json())
    .then(data => cities.push(...data));


//Functions
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //checking for matches
        const regex = new RegExp(wordToMatch, 'gi') // g - global, i - case insensetive
        return place.city.match(regex) || place.state.match(regex);
    })
}
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName =
            place.city.replace(regex, `<span class="h1">${this.value}</span>`);
        return `
        <li>
        <span class="name">${cityName}, ${place.state}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    });
    suggestions.innerHTML = html.join(' '); //join - to convert an array into a string

}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}




//Event Listeners
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);