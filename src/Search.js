import React, { useState } from "react";
const api = {
  key: "1cdab166f48f11eeae9aa944fc8dfb58",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  /* 
  const timeBuilder = (t) => {
    let hours = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
    let minutes = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
    let seconds = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };
*/
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 25
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name.replace("Gemeente ", "")}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
              <div className="weather">
                <span>{weather.weather[0].main}</span>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <div className="description">
                  Details: {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Search;
