
var fetchButton = document.getElementById('fetch-button');
var APIKey= "e5fd74ef0282ecdaf377823bb26acafb";
var city;
var searchHistory = document.getElementById("searchHistory");


console.log(city);

function displayWeather(city) {
    city = document.getElementById('city').value;
 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // console.log(requestURL);
    localStorage.setItem(city, `${city}`);

    function fetLocalStorage() {
        ul.innerHTML = '<li>' + localStorage.getItem(city) + '</li>'
    }


  fetch(requestURL)
    .then(function (response) {
        console.log("map API response:", response);
      return response.json();
    })
    .then(function (data) {
        console.log("map API data:", data);
        console.log(data.wind.speed);
    })
    .catch(function(error) {
        console.error("map API error: ", error);
    })
}
// Append data to the div

function cityCoordinates()  {
    city = document.getElementById('city').value;

    var fiveDay = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;

    fetch(fiveDay)
        .then(function (response)   {
        return response.json();
    })
    .then(function (data)  {
        console.log(data);
        console.log(data[0].lat, data[0].lon);
        extendedForecast(data[0].lat, data[0].lon);
    })
    .catch(function(error)  {
        console.error("map API error: ", error);
    })
}

// for (var i = 0; i < localStorage.length; i++) {
//     searchHistory.append(<li> + localStorage.getItem(localStorage.key(i)) + </li>);
// }

var five = [];

function extendedForecast(lat,lon) {
    var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    console.log(fiveDays);

    fetch(fiveDays)
        .then(function (response)   {
            return response.json();
        })
        .then(function (data)   {
            console.log(data);
            five.push(data.list[3]);
            five.push(data.list[11]);
            five.push(data.list[19]);
            five.push(data.list[27]);
            five.push(data.list[35]);
        })
} 
// append five day data to the id cards at the bottom of screen.  Generate with append then create a for loop to grab each card

function displayForecast()  {
    for (var i = 0; i < five.length; i++);
        //CREATE CARDS FOR EACH ITERATION
}

fetchButton.addEventListener('click', function() {
    cityCoordinates();
    displayWeather(city);
});
