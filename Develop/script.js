
var fetchButton = document.getElementById('fetch-button');
var APIKey= "e5fd74ef0282ecdaf377823bb26acafb";
var city;

console.log(city);

function displayWeather(city) {
    city = document.getElementById('city').value;
 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // console.log(requestURL);


  fetch(requestURL)
    .then(function (response) {
        console.log("map API response:", response);
      return response.json();
    })
    .then(function (data) {
        console.log("map API data:", data);
    })
    .catch(function(error) {
        console.error("map API error: ", error);
    })
}


fetchButton.addEventListener('click', displayWeather);
