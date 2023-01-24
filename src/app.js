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
let days = ["Sunday", "Monday", "Tuesday", "Wednesday" , "Thursday", "Friday", "Saturday"];
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
    
    let forecastHTML= "";
    
forecast.forEach(function(forecastDay, index){

    if (index<4){ 
forecastHTML= forecastHTML + `
    <div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-4 " id="date-forecast">${formatDay(forecastDay.dt)}</div>
            <div class="col-5"> <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon"></div>
            <div class="col-3 forecast-temperature"><span id="max-temperature">${Math.round(forecastDay.temp.max)}°</span> <span id="min-temperature">${Math.round(forecastDay.temp.min)}°</span></div>
    
        </div>
    </div>
</div>
    `;
    }
    })

    forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates){
//console.log(coordinates);
let apiKey = "cad4a7b2655c670bbf4e9139ebd662ce";
let apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}



function  displayTemperature(response){
//console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
     let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
     let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
     let dateElement = document.querySelector("#date");
     let iconElement = document.querySelector("#icon");

    

temperatureElement.innerHTML =Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);

}

function search(city){
let apiKey = "cad4a7b2655c670bbf4e9139ebd662ce";

 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 
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
