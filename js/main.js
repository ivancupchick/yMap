ymaps.ready(init);

function init(){    
  let Map = new ymaps.Map("map", {
  center: [53.901596, 27.551975],
  zoom: 6
  });
  Map.events.add('click', (foo) => {
    let coords = foo.get('coords');
    let weather = requestWeather(coords);
    Map.balloon.open(coords, {
      contentHeader: weather.temperature
    });
  });
}

function requestWeather(coords) {
  let lat = coords[0];
  let lon = coords[1];
  let request = new XMLHttpRequest();
  let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + 
            "&lon=" + lon + "&appid=e409a8d16fd831b64ac77fa22ebc3d8e";
  request.open('GET', url, false);
  request.send();
  if (request.status == 200) {
    return makeFormat(request.responseText);
  }
}

function makeFormat(forecast) {
  forecast = JSON.parse(forecast);
  let weather = {};
  weather.temperature = forecast.main.temp - 273.15;
  weather.temperature = weather.temperature.toFixed(0);
  return weather;
}


/*
{
"coord":{"lon":139.01,"lat":35.02},
"weather":[{"id":800,"main":"Clear",
"description":"clear sky","icon":"01n"}],
"base":"stations",
"main":{"temp":285.514,
"pressure":1013.75,"humidity":100,"temp_min":285.514,"temp_max":285.514,"sea_level":1023.22,"grnd_level":1013.75},"wind":{"speed":5.52,"deg":311},"clouds":{"all":0},"dt":1485792967,"sys":{"message":0.0025,"country":"JP","sunrise":1485726240,"sunset":1485763863},"id":1907296,"name":"Tawarano","cod":200}
*/