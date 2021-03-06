ymaps.ready(init);

function init(){    
  let Map = new ymaps.Map("map", {
  center: [53.901596, 27.551975],
  zoom: 6
  });
  Map.events.add('click', (e) => {
    let coords = e.get('coords');
    let weather = {};
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=e409a8d16fd831b64ac77fa22ebc3d8e`)
      .then( request => request.json())
      .then( (request) => {
        weather = makeFormat(request);
        Map.balloon.open(coords, {
          contentHeader: weather.temperature
        });
      });
  });
}

function makeFormat(forecast) {
  let weather = {};
  weather.temperature = (forecast.main.temp - 273.15).toFixed(0);
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