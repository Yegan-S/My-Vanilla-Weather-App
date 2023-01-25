function formatDate(timestamp){
let date = new Date(timestamp);
let hours= date.getHours();
if (hours< 10){
    hours = `0${hours}`;
}
let minutes= date.getMinutes();
if (minutes< 10){
    minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed" , "Thu", "Fri", "Sat"];
let day= days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed" , "Thu", "Fri", "Sat"];
return days[day];
    
}

function displayForecast(response){
   let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
     console.log(response.data.daily);
    let forecastHTML=  `<div class="card-body forecast-card-body" id="forecast-card-body">Upcoming days</div>`;
    
forecast.forEach(function(forecastDay, index){

    if (index<4){ 
forecastHTML= forecastHTML + `
      
        <div class="row">
            <div class="col-4 " id="date-forecast">${formatDay(forecastDay.time)}</div>
            <div class="col-5"> <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png" alt="" id="icon-forecast"></div>
            <div class="col-3 forecast-temperature"><span id="max-temperature">${Math.round(forecastDay.temperature.maximum)}°</span> <span id="min-temperature">${Math.round(forecastDay.temperature.minimum)}°</span></div>
    
        </div>
   

    `;
    }
    })

    forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates){
   
let apiKey = "tb5f08b166ada0ab28a3f4o4dec6c3e0";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}



function  displayTemperature(response){

    let temperatureElement = document.querySelector("#temperature");
     let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
     let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
     let dateElement = document.querySelector("#date");
     let iconElement = document.querySelector("#icon");

    

temperatureElement.innerHTML =Math.round(response.data.temperature.current);
cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = response.data.temperature.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.time * 1000);
iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
iconElement.setAttribute("alt", response.data.condition.icon);

getForecast(response.data.coordinates);

}

function search(city){
let apiKey = "tb5f08b166ada0ab28a3f4o4dec6c3e0";

 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 
 axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) { 
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

let celsiusTemperature = null;

 let form = document.querySelector("#search-form");
 form.addEventListener("submit", handleSubmit);

 
 search("New York");
