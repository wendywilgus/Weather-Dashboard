
var fetchButton = document.getElementById('fetch-button') //search button 
var APIKey= "e5fd74ef0282ecdaf377823bb26acafb";
var city;
let previousCities = JSON.parse(localStorage.getItem("search"));
if (!previousCities) {
    previousCities = [];
} 
// console.log("history", previousCities);
var currentCity = document.getElementById("current-city");
var todaysDate = moment().format("MMMM Do, YYYY");
var temp = document.getElementById("tempEl");

var currentHumidity= $("#humidity");
var windSpeed = $("windSpeed");

var cityList = document.getElementById("history");
var historyButton = document.getElementById("history");
var cardDeck = document.querySelector(".card-deck");


//Get date from Moment
const dateElement = document.getElementById("current-date");
dateElement.innerHTML = `Today is ${todaysDate}`;

//Search Button Event Listener
fetchButton.addEventListener("click", function(event)   {
    event.preventDefault();
    // console.log("onSearchClick", city);
    city = document.getElementById('city').value;
    displayWeather();
    cityCoordinates();
    document.getElementById('city').value = "";
})
// kicks off all functions when search button is clicked


//Function to return city history
function historyCallback(event) {
    console.log(event.target);
    var individualCity = event.target;
    city = individualCity.textContent;
    // console.log("now", buttonClicked);
    displayWeather();
    cityCoordinates();
}
    

    
function getCitiesFromStorage() {
// create an HTML Entity button with City label
    for (var i = 0; i < previousCities.length; i++) {
        var btn = document.createElement("button");
        btn.setAttribute
        var t = document.createTextNode(previousCities[i]);
        console.log("previousCities", previousCities[i]);
        btn.appendChild(t);
        cityList.appendChild(btn);
    }
}
cityList.addEventListener("click", historyCallback);
getCitiesFromStorage();

//change temp from K to F
function kelvinConverter(valNum){
    valNum = parseFloat(valNum);
    temp.innerHTML= 'Temperature: '+ (Math.floor((valNum-273.15)*1.8)+32)+' \u00B0F';
}

//Function for today's weather display
function displayWeather() {
    // console.log("displayWeather city", city);
 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    
    fetch(requestURL)
        .then(function (response) {
            // console.log("map API response:", response);
            return response.json();   
        })
        .then(function (data) {
            // console.log('displayWeather onResponse', data);
            if(data.cod == '200') {
                // ONLY save city when one is valid
                if (!previousCities.includes(city)) {
                previousCities.push(city);       
                localStorage.setItem("search", JSON.stringify(previousCities));
              
                var btn = document.createElement("button");
                var t = document.createTextNode(city);
                btn.appendChild(t);
                var cityList = document.getElementById("history");
                cityList.appendChild(btn);
                };
    
                let citySearched = data.name;
                currentCity.innerHTML = citySearched;
                // // console.log("map API data:", data);
                // console.log("windspeed", data.wind.speed);
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



//Function for five day forecast
function cityCoordinates()  {
    console.log("cityCoordinates city", city);

    var fiveDay = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;

    fetch(fiveDay)
        .then(function (response)   {
        return response.json();
    })
    .then(function (data)  {
        // console.log(data);
        // console.log(data[0].lat, data[0].lon);
        extendedForecast(data[0].lat, data[0].lon);
    })
    .catch(function(error)  {
        console.error("map API error: ", error);
    })
}



function extendedForecast(lat,lon) {
    var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    // console.log("5 days", fiveDays);

    let five = [];
    fetch(fiveDays)
        .then(function (response)   {
            return response.json();
        })
        .then(function (data)   {
            // console.log('extendedForecast onReponse:', data);
            
                five.push(data.list[3]);
                five.push(data.list[11]);
                five.push(data.list[19]);
                five.push(data.list[27]);
                five.push(data.list[35]);
        })
        .then(function ()   {
            // console.log(five);
            cardDeck.innerHTML = "";
            for (let i = 0; i < five.length; i++) {
                var card = document.createElement("div")
                card.classList.add("card");
                cardDeck.appendChild(card);

                var date = five[i].dt;
                var dt = new Date(date * 1000);
                var datec = document.createElement("p");
                        //datec = moment(date).format("MM DD YYYY");
                        datec.textContent = (moment(dt).format("MM/DD/YYYY"));
                        card.append(datec);

                var icon = document.createElement("img");     
                icon.src = ("src","http://openweathermap.org/img/w/" + five[i].weather[0].icon + ".png"); 
              
                card.appendChild(icon);
              
                
                var temp = document.createElement("h6");
                temp.textContent = "Temp: " + five[i].main.temp + "??F";
                // console.log(five[i].main.temp);
                card.append(temp);

                var wind = document.createElement("h6");
                wind.textContent = "Wind: " + five[i].wind.speed + "MPH";
                card.appendChild(wind);
                
                var hum = document.createElement("h6");
                hum.textContent = "Humidity: " + five[i].main.humidity + "%";
                card.appendChild(hum);
            }
        }) 
}

