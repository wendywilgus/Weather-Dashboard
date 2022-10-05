# 06 Server-Side APIs: Weather Dashboard

Module 6 Assignment

## Description

The purpose of this project is to create an application in which third-party APIs are used to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.  Users can enter a city by name to see the current weather, as well as the extended five day forcast.  Additionally, the application stores city names and allows the user to click on their previous cities searched to recall the weather quickly.

I have used the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Solving the problems of this project taught me to better understand how to use APIs to call data for users, as well as continued practice with creating elements in JavaScript and using local storage to persist the data.

Link to deployed site here: https://wendywilgus.github.io/Weather-Dashboard/

## Table of Contents

- [Story](#user-story)
- [Mockup](#mockup) 
- [Languages Used](#languages)
- [Credits](#credits)
- [Resources](#resources)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

## Languages Used
The following languages were used to create this project:

-HTML

-CSS

-JavaScript

## Credits

This project was completed as part of Georgia Tech's Full Stack Development Boot Camp course. 
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.

## Resources

The following resources were helpful in researching best practices and problem-solving on the project.

- APIs https://medium.com/epfl-extension-school/an-illustrated-introduction-to-apis-10f8000313b9 
- Moment.js https://medium.com/@thejasonfile/a-moment-with-moment-js-c5d097d2b61c
-Event Listeners https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
-Local Storage https://egghead.io/lessons/javascript-avoid-losing-text-when-refreshing-the-browser-with-localstorage