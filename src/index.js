
const getDataFor1thLoad = async () => {
    const responseWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.45466&lon=30.5238&units=metric&appid=3b574fda9b6589454d967f8aef44540d');
    const myJson = await responseWeather.json();

    console.log("myJson=" + JSON.stringify( myJson));

    // .weather__city
    let weatherCity = document.getElementsByClassName("weather__city");
    weatherCity[0].innerHTML = myJson.name;
    //
    let weatherDeg = document.getElementsByClassName("weather__deg");
    weatherDeg[0].innerHTML = myJson.main.temp_max + " / " +  myJson.main.temp_min;
}
getDataFor1thLoad();

// .head__data
let headData = document.getElementsByClassName("head__data");
let currentDT = new Date().toString().split(" ").splice(2, 3).join(" | ");

headData[0].innerHTML = currentDT;

// .weather__city
let weatherCity = document.getElementsByClassName("weather__city");

// .search__btn
let searchBtn = document.getElementsByClassName("search__btn")[0];

searchBtn.onclick = function (e) {
    e.preventDefault();
    let searchCity = document.getElementsByClassName("search__city")[0].value;

    getDataForSearch(searchCity);
};

async function  getDataForSearch(city) {
    const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=3b574fda9b6589454d967f8aef44540d');
    let myCity = await response.json();

    myCity = myCity[0];

    const responseWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + myCity.lat + '&lon=' + myCity.lon + '&units=metric&appid=3b574fda9b6589454d967f8aef44540d');
    const myJson = await responseWeather.json();

    // do something with myJson
    // console.log(myJson);
    // .weather__city
    let weatherCity = document.getElementsByClassName("weather__city");
    weatherCity[0].innerHTML = myJson.name;
    //
    let weatherDeg = document.getElementsByClassName("weather__deg");
    weatherDeg[0].innerHTML = myJson.main.temp_max + " / " +  myJson.main.temp_min;
}