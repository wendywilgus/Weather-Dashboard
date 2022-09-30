
var fetchButton = document.getElementById('fetch-button');
var APIKey= "e5fd74ef0282ecdaf377823bb26acafb";
var city;
var searchHistory = document.getElementById("searchHistory");
var currentCity = document.getElementById("current-city");
var todaysDate = moment().format("MMMM Do, YYYY");
var temp = document.getElementById("tempEl");
// var icon = document.getElementById("weather-icon");
// console.log("icon", icon);

// var humidity = document.getElementById("humidity");
var currentHumidity= $("#humidity");
var windSpeed = $("windSpeed");

// console.log(city);


const dateElement = document.getElementById("current-date");
dateElement.innerHTML = `Today is ${todaysDate}`;

function kelvinConverter(valNum){
    valNum = parseFloat(valNum);
    temp.innerHTML= 'Temperature: '+ (Math.floor((valNum-273.15)*1.8)+32)+' \u00B0F';
}


function displayWeather(city) {
    city = document.getElementById('city').value;
 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // console.log(requestURL);
    localStorage.setItem(city, `${city}`);


  fetch(requestURL)
    .then(function (response) {
        console.log("map API response:", response);
        return response.json();   
    })
    .then(function (data) {
        let citySearched = data.name;
        // console.log( citySearched);
        currentCity.innerHTML = citySearched;
        console.log("map API data:", data);
        console.log("windspeed", data.wind.speed);
        kelvinConverter(data.main.temp);
        $('.humidity').text("Humidity: " + data.main.humidity + "%");
        $('#windSpeed').text("Wind Speed: " + Math.floor(data.wind.speed*2.237) + "MPH");
        $('.weather-icon').html(`<img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png' />`);

        return data;

    })
    .catch(function(error) {
        console.error("map API error: ", error);
    })
}
// Get Search History
fetchButton.addEventListener("click", function () {
    const searchTerm = city.text;
    console.log("City", searchTerm);
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

function fetchLocalStorage() {
    searchHistory.innerHTML = '<li>' + localStorage.getItem(city) + '</li>'
}

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



var five = [];

function extendedForecast(lat,lon) {
    var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    console.log("5 days", fiveDays);

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
    // Code to display 5-Day forcast to cards
        const fiveDayEl = document.querySelectorAll(".fiveDay");
        for (i = 0; i < fiveDayEl.length; i++) {
            fiveDayEl[i].innerHTML = "";
        }
} 
// append five day data to the id cards at the bottom of screen.  Generate with append then create a for loop to grab each card

function displayForecast()  {
    for (var i = 0; i < five.length; i++);
        //CREATE CARDS FOR EACH ITERATION
}

fetchButton.addEventListener('click', function() {
    cityCoordinates();
    displayWeather(city);
    event.preventDefault();
})
