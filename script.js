/* Free Code Camp - Local Weather App using the Open Weather Map API and stock images from Unsplash.

Written in vanilla JavaScript to practice accessing and changing DOM elements.

@khopsickle */

var strApiKey = '2cfbe344e72164fe479ea1e81f8a2240',
  strUnits = 'imperial',
  jsonWeather,
  $body = document.body,
  $fahrenheit = document.getElementById('fahrenheit'),
  $celsius = document.getElementById('celsius'),
  valLight = 'rgba(255, 255, 255, 0.1)',
  valDark = 'rgba(255, 255, 255, 0.6)',
  xhr = new XMLHttpRequest();

// obtains browser location
function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

// geolocation success
function success(position) {
  var flLat = position.coords.latitude;
  var flLong = position.coords.longitude;

  getData(flLat, flLong);
}

// geolocation fail
function error(error) {
  document.getElementById('error').innerHTML = 'Geolocation not allowed.';
}

// loads data from API
function getData(lat, long) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?' + '&lat=' + lat + '&lon=' + long + '&units=' + strUnits + '&APPID=' + strApiKey;
  xhr.open('GET', url, false);
  xhr.send();
  jsonWeather = JSON.parse(xhr.responseText);

  displayWeather();
  displayBackground(jsonWeather.weather[0].description);
}

// displays API data in HTML page
function displayWeather() {
  /* var $elements = document.querySelectorAll('[data-api]');
  for (var i = 0; i < $elements.length; i++) {
    $elements[i].innerHTML = eval(jsonWeather + '.' + $elements[i].getAttribute('data-api'));
  } */

  // unfortunately not DRY code because I couldn't get the above code to work
  document.getElementById('name').innerHTML = jsonWeather.name;
  document.getElementById('temp').innerHTML = Math.round(jsonWeather.main.temp) + '&deg;';
  document.getElementById('desc').innerHTML = jsonWeather.weather[0].description;
}

// displays background image to match weather conditions
function displayBackground(str) {
  strUrl = 'url("http://i.imgur.com/';

  switch (str) {
    case 'clear sky':
      strSwitchUrl = 'j2CZFXL';
      break;
    case 'few clouds':
      strSwitchUrl = 'sm6tMoL';
      break;
    case 'scattered clouds':
      strSwitchUrl = 'OcwtsWu';
      break;
    case 'broken clouds':
      strSwitchUrl = 'vPSwiCc';
      break;
    case 'light rain':
      strSwitchUrl = 'hoQfUQ4';
      break;
    case 'rain':
      strSwitchUrl = 'EV13vCU';
      break;
    case 'thunderstorm':
      strSwitchUrl = 'EebR59u';
      break;
    case 'snow':
      strSwitchUrl = 'wzpQpa8';
      break;
    case 'mist':
      strSwitchUrl = 'YF5UeG1';
      break;
  }

  strUrl += strSwitchUrl + '.jpg") no-repeat center center fixed';
  $body.style.background = strUrl;
}

// function for toggling F and C
function changeUnit() {
  if (strUnits === 'imperial') {
    strUnits = 'metric';
    $fahrenheit.style.color = valLight;
    $celsius.style.color = valDark;
  } else {
    strUnits = 'imperial';
    $fahrenheit.style.color = valDark;
    $celsius.style.color = valLight;
  }
  getLocation();
}

// event handler for toggling F and C
document.getElementById('btn-units').onclick = changeUnit;

// set lighter C color (because strUnits is initially imperial)
$celsius.style.color = valLight;

// start functions on page load
getLocation();