
const getDataFor1thLoad = async () => {
    const responseWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.45466&lon=30.5238&units=metric&appid=3b574fda9b6589454d967f8aef44540d');
    const myJson = await responseWeather.json();

//    console.log("myJson=" + JSON.stringify( myJson));

    // .weather__city
    let weatherCity = document.getElementsByClassName("weather__city");
    weatherCity[0].innerHTML = myJson.name;
    //
    let weatherDeg = document.getElementsByClassName("weather__deg");
    weatherDeg[0].innerHTML = myJson.main.temp_max + "&deg / " +  myJson.main.temp_min + "&deg";
    // +
    let weatherAddl = document.getElementsByClassName("weather_addl");
    weatherAddl[0].innerHTML = "<b>Humidity:</b> " + myJson.main.humidity + "%<br>" +
        "<b>Wind:</b> " + myJson.wind.speed + "km/h <br>" +
        "<b>Description:</b> " + myJson.weather[0].description;
    // +
    let mainIcon = document.getElementById("main-icon");
    iconlink = 'https://openweathermap.org/img/wn/' + myJson.weather[0].icon + '.png'
    mainIcon.innerHTML = "<img src='" + iconlink + "'>";
}
getDataFor1thLoad();

// .head__data
let headData = document.getElementsByClassName("head__data");
let currentDT = new Date().toString().split(" ").splice(2, 3).join(" | ");

headData[0].innerHTML = currentDT;

// .weather__city
//let weatherCity = document.getElementsByClassName("weather__city");

// .search__btn
let searchBtn = document.getElementsByClassName("search__btn")[0];
searchBtn.onclick = function (e) {
    e.preventDefault();
    let searchCity = document.getElementsByClassName("search__city")[0].value;
    getDataForSearch(searchCity, 'metric');
};

async function  getDataForSearch(city, unit) {
    const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=3b574fda9b6589454d967f8aef44540d');
    let myCity = await response.json();

    myCity = myCity[0];

    // console.log("myCity=" + JSON.stringify( myCity ));

    const responseWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + myCity.lat + '&lon=' + myCity.lon + '&units=' + unit + '&appid=3b574fda9b6589454d967f8aef44540d');
    const myJson = await responseWeather.json();

    // .weather__city
    let weatherCity = document.getElementsByClassName("weather__city");
    weatherCity[0].innerHTML = myJson.name;
    //
    let weatherDeg = document.getElementsByClassName("weather__deg");
    weatherDeg[0].innerHTML = myJson.main.temp_max + "&deg / " +  myJson.main.temp_min + "&deg";

    let speed;
    if (unit === 'imperial'){
        speed = 'm/h';
    } else {
        speed = 'km/h';
    }
    // + 1
    let weatherAddl = document.getElementsByClassName("weather_addl");
    weatherAddl[0].innerHTML = "<b>Humidity:</b> " + myJson.main.humidity + "%<br>" +
        "<b>Wind:</b> " + myJson.wind.speed + speed + " <br>" +
        "<b>Description:</b> " + myJson.weather[0].description;
    // + 1
    let mainIcon = document.getElementById("main-icon");
    iconlink = 'https://openweathermap.org/img/wn/' + myJson.weather[0].icon + '.png'
    mainIcon.innerHTML = "<img src='" + iconlink + "'>";
}

// .unit__c button
let unitCbtn = document.getElementsByClassName("unit__c")[0];
unitCbtn.onclick = function (e) {
    e.preventDefault();
    let currentCity = document.getElementsByClassName("weather__city")[0].innerHTML;
    getDataForSearch(currentCity, 'metric');
};

// .unit__f button
let unitFbtn = document.getElementsByClassName("unit__f")[0];
unitFbtn.onclick = function (e) {
    e.preventDefault();
    let currentCity = document.getElementsByClassName("weather__city")[0].innerHTML;
    getDataForSearch(currentCity, 'imperial');
};