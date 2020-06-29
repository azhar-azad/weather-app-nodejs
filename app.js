const request = require('request');

// request({
//     uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyAu6nUkoRZMW9XVDI84NCJzzFFHutfslxo',
//     json: true
// }, (error, response, body) => {
//     console.log(body);
// });

const weather_base_url = 'https://api.openweathermap.org/data/2.5/weather';
const weather_api_key = '51b021a536df43152ec4549a39d0c334';
const weather_params = {
    unit: 'metric',
    lat: '23.794925',
    long: '90.426770'
};
const weather_url =
    `${weather_base_url}?appid=${weather_api_key}&units=${weather_params.unit}&lat=${weather_params.lat}&lon=${weather_params.long}`;

request({ url: weather_url, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service');
    } else if (response.body.message) {
        console.log('Unable to find location');
    } else {
        var temp = response.body.main.temp;
        var feelsLike = response.body.main.feels_like;
        console.log(`It is currently ${temp} degrees out. But it feels like ${feelsLike} degrees`);
    }
});


const geocoding_base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const geocoding_api_key = 'pk.eyJ1Ijoic25vd2ZveGJkIiwiYSI6ImNrYzA5cGZiZjAzcGUyd3Z0cjBuNnE4eDgifQ._rUoMvOc3S7-CCeZ3AMLJg';
const geocoding_params = {
    searchTerm: 'dhaka',
    limit: 1
};

const geocoding_url = `${geocoding_base_url}${geocoding_params.searchTerm}.json?access_token=${geocoding_api_key}&limit=${geocoding_params.limit}`;

request({ url: geocoding_url, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service');
    } else if (response.body.message) {
        console.log('Unable to find location');
    } else if (response.body.features.length === 0) {
        console.log('Bad search term. Try again with correct location');
    } else {
        var long = response.body.features[0].center[0];
        var lat = response.body.features[0].center[1];
        console.log(`lat: ${lat}, long: ${long}`);
    }
});

// https://api.mapbox.com/geocoding/v5/mapbox.places/dhaka.json?access_token=pk.eyJ1Ijoic25vd2ZveGJkIiwiYSI6ImNrYzA5cGZiZjAzcGUyd3Z0cjBuNnE4eDgifQ._rUoMvOc3S7-CCeZ3AMLJg&limit=1
