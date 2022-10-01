
var fetchButton = document.getElementById('fetch-button');
var APIKey= "e5fd74ef0282ecdaf377823bb26acafb";
var city;
let searchHistory = JSON.parse(localStorage.getItem("search"));
if (!searchHistory) {
    searchHistory = [];
} 
console.log("history", searchHistory);
var currentCity = document.getElementById("current-city");
var todaysDate = moment().format("MMMM Do, YYYY");
var temp = document.getElementById("tempEl");

var currentHumidity= $("#humidity");
var windSpeed = $("windSpeed");
var five = [];



const dateElement = document.getElementById("current-date");
dateElement.innerHTML = `Today is ${todaysDate}`;

function getCitiesFromStorage() {
    var previousCities = JSON.parse(localStorage.getItem("search", searchHistory));
    console.log("previous", previousCities);
    
    // create an HTML Entity button with City label
    for (var i = 0; i < previousCities.length; i++) {
        var btn = document.createElement("button");
        var t = document.createTextNode(previousCities[i]);
        btn.appendChild(t);
        var cityList = document.getElementById("history");
        cityList.appendChild(btn);
    
    // onClick eventCallback will call new event function
    //         \ inside that function 
    //              define city again
    //              call displayWeather();
    //              call cityCoordinates();
    // btn.addEventListener("click", cityCoordinates);
    }
}
window.onload = getCitiesFromStorage();

function kelvinConverter(valNum){
    valNum = parseFloat(valNum);
    temp.innerHTML= 'Temperature: '+ (Math.floor((valNum-273.15)*1.8)+32)+' \u00B0F';
}


function displayWeather() {
    city = document.getElementById('city').value;
    console.log("displayWeather city", city);
 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    
    fetch(requestURL)
        .then(function (response) {
            console.log("map API response:", response);
            return response.json();   
        })
        .then(function (data) {
            console.log('displayWeather onResponse', data);
            if(data.cod == '200') {
                // ONLY save city when one is valid
                searchHistory.push(city);
                localStorage.setItem("search", JSON.stringify(searchHistory));
              
                var btn = document.createElement("button");
                var t = document.createTextNode(city);
                btn.appendChild(t);
                var cityList = document.getElementById("history");
                cityList.appendChild(btn);
    
                let citySearched = data.name;
                currentCity.innerHTML = citySearched;
                console.log("map API data:", data);
                console.log("windspeed", data.wind.speed);
                kelvinConverter(data.main.temp);
                $('.humidity').text("Humidity: " + data.main.humidity + "%");
                $('#windSpeed').text("Wind Speed: " + Math.floor(data.wind.speed*2.237) + "MPH");
                $('.weather-icon').html(`<img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png' />`);
    
                return data;
            }

        })
        .catch(function(error) {
            console.error("map API error: ", error);
        })
}




function cityCoordinates()  {
    console.log("cityCoordinates city", city);

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



function extendedForecast(lat,lon) {
    var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    console.log("5 days", fiveDays);

    fetch(fiveDays)
        .then(function (response)   {
            return response.json();
        })
        .then(function (data)   {
            console.log('extendedForecast onReponse:', data);
            five.push(data.list[3]);
            five.push(data.list[11]);
            five.push(data.list[19]);
            five.push(data.list[27]);
            five.push(data.list[35]);
        })
 

// append five day data to the id cards at the bottom of screen.  Generate with append then create a for loop to grab each card
 //CREATE CARDS FOR EACH ITERATION
    .then(function (response)   {
        // five[i].innerHTML = "";
        // var dayOne = moment(response.list[3].dt_txt).format("ddd, MMM D");
    })
}


fetchButton.addEventListener('click', function() {
    displayWeather();
    cityCoordinates();
    event.preventDefault();
    // console.log("City", searchTerm);
    // displayWeather(searchTerm);
    // renderSearchHistory();
})