let search = document.getElementById("search"); 
let ort = document.getElementById("ort"); 
let Icons = document.getElementById("icons"); 
let temputure = document.getElementById("temputure"); 
let Wind = document.getElementById("Wind"); 
let Humidity = document.getElementById("Humidity"); 
let btn = document.getElementById("btn"); 
let img = document.getElementById("icons"); 
let Area1 = document.querySelector(".Area1") 
let Area2 = document.querySelector(".Area2") 
let Container = document.querySelector(".Container"); 

const weatherCodeMap = {
    0: ["Clear Sky", "icons/sun.png"],
    1: ["Mainly Clear", "icons/sun.png"],
    2: ["Partly Cloudy", "icons/cloudy.png"],
    3: ["Overcast", "icons/overcast.png"],
    45: ["Fog", "icons/fog.png"],
    48: ["Depositing Rime Fog", "icons/fog.png"],
    51: ["Light Drizzle", "icons/rain.png"],
    53: ["Moderate Drizzle", "icons/rain.png"],
    55: ["Dense Drizzle", "icons/rain.png"],
    56: ["Light Freezing Drizzle", "icons/rain.png"],
    57: ["Dense Freezing Drizzle", "icons/rain.png"],
    61: ["Slight Rain", "icons/rain.png"],
    63: ["Moderate Rain", "icons/rain.png"],
    65: ["Heavy Rain", "icons/rain.png"],
    66: ["Light Freezing Rain", "icons/rain.png"],
    67: ["Dense Freezing Rain", "icons/rain.png"],
    71: ["Light Snow", "icons/snow.png"],
    73: ["Moderate Snow", "icons/snow.png"],
    75: ["Heavy Snow", "icons/snow.png"],
    77: ["Snow Grains", "icons/snow.png"],
    80: ["Slight Rain Showers", "icons/rain.png"],
    81: ["Moderate Rain Showers", "icons/rain.png"],
    82: ["Violent Rain Showers", "icons/rain.png"],
    85: ["Slight Snow Showers", "icons/snow.png"],
    86: ["Heavy Snow Showers", "icons/snow.png"],
    95: ["Thunderstorm", "icons/thunderstorm.png"],
    96: ["Thunderstorm With Slight Hail", "icons/thunderstorm.png"],
    99: ["Thunderstorm With Heavy Hail", "icons/thunderstorm.png"]
};

document.addEventListener("DOMContentLoaded", function()
{
    img.style.visibility = "hidden"; 
    ort.style.visibility = "hidden"; 
    temputure.style.visibility = "hidden"; 
    Area1.style.visibility = "hidden"; 
    Area2.style.visibility = "hidden"; 
    Container.style.height = "150px"; 
}); 


search.addEventListener("keydown", function(event) {
    if (event.key === "Enter")
    {
        event.preventDefault(); 
        getweather(); 
    }

}); 

btn.addEventListener("click", getweather)
async function getweather() 
{
    let geosearch = search.value.trim(); 

    //Data Coordinates 
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${geosearch}&count=10&language=de`; 
    const geoResponse = await fetch(url); 
    const geoData = await geoResponse.json(); 
    console.log(geoData); 
    
    const latitude = geoData.results[0].latitude; 
    const longitude = geoData.results[0].longitude; 
    const conutry = geoData.results[0].country; 
    const countryCode = geoData.results[0].country_code; 

    //Weather API 
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,precipitation_probability&current=is_day`;
    const weatheResponse = await fetch(weatherUrl); 
    const weatherData = await weatheResponse.json(); 
    console.log(weatherData); 

    const Temputure = weatherData.current_weather.temperature; 
    const TemputureSymbol = weatherData.current_weather_units.temperature; 

    const windspeed = weatherData.current_weather.windspeed; 
    const windspeedSymbol = weatherData.current_weather_units.windspeed; 

    const humidity = weatherData.hourly.relative_humidity_2m[0]; 
    const humiditySymbol = weatherData.hourly_units.relative_humidity_2m; 

    const weatherCode = weatherData.current_weather.weathercode; 
    const [weatherCondition, weatherImage] = weatherCodeMap[weatherCode]; 

    const isDay = weatherData.current_weather.is_day; 


    //Show Container
    img.style.visibility = "visible"; 
    ort.style.visibility = "visible"; 
    temputure.style.visibility = "visible"; 
    Area1.style.visibility = "visible"; 
    Area2.style.visibility = "visible"; 
    Container.style.height = "850px"; 

    //Displaying & Final Check
    if (typeof conutry === "undefined")
    {
        ort.innerHTML = `${countryCode}, ${geosearch}`; 
    }
    else 
    {
            ort.innerHTML = `${conutry}, ${geosearch}`; 
    }

    temputure.innerHTML = `${Math.round(Temputure)}${TemputureSymbol}`; 

    if (isDay == 1)
    {
        img.src = weatherImage; 
    }
    else if (isDay == 0)
    {
        img.src = "icons/mond.png"; 
    }

    Wind.innerHTML = `${windspeed}${windspeedSymbol}`
    Humidity.innerHTML = `${humidity}${humiditySymbol}`
}