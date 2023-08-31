import getWeatherData from './weather';

const city = document.querySelector('.weather-card__city');
const condition = document.querySelector('.weather-card__condition');
const humidity = document.querySelector('.weather-card__humidity');
const icon = document.querySelector('.weather-card__icon');
const precipitation = document.querySelector('.weather-card__precipitation');
const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const temp = document.querySelector('.weather-card__temp');
const units = document.querySelectorAll('.weather-card__unit');
const wind = document.querySelector('.weather-card__wind');

let selectedUnit = 'C';
let selectedLocation = 'London';

export default async function updateWeatherCard(location) {
  const data = await getWeatherData(location);
  // undefined means an invalid location was entered, so we halt execution
  if (data === undefined) return;

  icon.alt = data.current.condition.text;
  icon.src = `https:${data.current.condition.icon}`;
  temp.textContent = Math.round(selectedUnit === 'C' ? data.current.temp_c : data.current.temp_f);
  precipitation.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_mph} mph`;
  city.textContent = data.location.name;
  condition.textContent = data.current.condition.text;
}

function checkSearchValue() {
  const location = searchInput.value;
  if (location === '') return;

  // caching the selected location allows us to easily switch between temperature units
  selectedLocation = location;
  updateWeatherCard(location);
}

function setSelectedUnit(span) {
  units.forEach((el) => el.classList.remove('weather-card__unit--selected'));
  span.classList.add('weather-card__unit--selected');
  selectedUnit = span.dataset.unit;
}

//------------------------------------------------
// event listeners
//------------------------------------------------
searchButton.addEventListener('click', checkSearchValue);

searchInput.addEventListener('keydown', (event) => {
  if (event.code !== 'Enter') return;
  checkSearchValue();
});

units.forEach((span) =>
  span.addEventListener('click', (event) => {
    setSelectedUnit(event.target);
    updateWeatherCard(selectedLocation);
  }),
);
