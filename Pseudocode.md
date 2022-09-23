How do I get the weather data?  
    Find free public website to get accurate weather info. 
    I will need TWO SEPARATE API CALLS to get this one. There are TWO SEPERATE URLS FROM THE WEBSITE. 
    https://openweathermap.org/forecast5
    https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys


1. Weather dashboard displays
    Header:  Weather Dashboard
    div: USER INPUT Search for a City (retrieve geographical coordinates given a city name)
        textbox
        Submit button:  syncs with API
            stores in local storage
        list of recent cities searched (search history)
            click to return to that city's data from local storage


2. Main Content
    Box: Chosen city name with today's date icon for weather
        temp
        wind
        humidity
        UV index:  number inside box with background color to indicate favorable, moderate, or sever
    
    5-Day Forcast:  return the current day's weather and PUPULATE on the page 5 day forecast starting form the next day.  Is text "Five Day Forcast" always there? 
    Five CARDS
        Date
        icon 
        temp
        wind
        humidity


Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

3. Find a way to PERSIST the previous cities that were searched.  And click on the button of the previous city, their weather data will re-populate the page. 


## Smallest Steps Possible
1. Let's try to figure out my HTML file structure.  What is STATIC vs what is DYNAMIC?
-Navbar = Weather Dashboard
-Search for a City with the SearchBar and the Search Button
-Empty div called TodayWeather that will be used to APPEND the weather data when called. 
-Emply div to append the 5 day forecast (CARDS)
-Maybe another div/section where we can append all the PREVIOUS searches we've done

2.  Using CSS || Bootstrap, style the page

3. JavaScript
    A. Write a function that calls the openweathermap api and see if I can console.log the data. 
    B. The function should be called:  
        WHEN a city name is entered into the textbox
        AND the user clicks the search button

        ***How do I access or reference the **value** /name of the city the user inputs?
        ***How can I only call the function when the search button is **clicked**?
        ***How / What should I do to REFERENCE the data that returns? (do I put this in a variable? do I return this at the end of the function?)  **KEEP IN MIND WHAT GLOBAL AND LOCAL SCOPED VARIABLES DO**


    C. Once I call that data from the openweathermap website, I need to PARSE through the data/object returning and pull out just the values I need for today's forecast.
    - I need to POPULATE to the CURRENT Day page the Temp, wind, humidity, UV index, name of city, current date, and image for weather.
    - for the single day call, I BELIEVE it should be an OBJECT.
    - How do I grab values from the returning object, **create** an element, **add** text to that element, and **apend** to the page?

    D. So for the five day forecast, 
        - Does the SPECIFIC openweathermap api return the 5 day forecast OR does it return only the current day?
        - If it does NOT return the 5 day forecast, READ THE DOCUMENTATION
        - If the 5 day foreast call gives me back the data, I'm GOING TO GUESS it will be **an ARRAY of OBJECTS**
        - What did I learn that allows me to **Iterate** through an array and **create**, **add text**, and **append** elements to the page?
        -And then, I need to ppopulate these cards to the 5-day forecast div that I made.
    
    E. I need to find a way to have the user's previous searches PERSIST on the page.
        - Is there a way to sotre MULTIPLE user searches in a single reference? (HINT:  starts with the letter A!)
        - I need to find a way to have this data **PERSIST** Maybe add some kind of **STORAGE**
        - If we have this data in the  storage, maybe we can **SET** the **ITEMS** as a KEY-VALUE, and then **GET** the **ITEMS** when the page loads.
        - Since the previous searches need to immediately populate on the screen, I need to GET these items when the page loads. 
        - If I can store these values, I need to find a way to **TARGET** the specific city that I click on to MAKE the API call again (HINT: Did we learn anything that llows an HTML element to STORE VALUES?)

