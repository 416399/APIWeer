import React, { useState } from "react";
import './App.css';

const api = {
  key: "1cdab166f48f11eeae9aa944fc8dfb58",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

getLocation(){
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
    (position) => {
        this.setState(
        (prevState) => ({
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
            }), () => { this.getWeather(); }
        );
    },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}

getWeather(){
        // Construct the API url to call
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=key';
        // Call the API, and set the state of the weather forecast
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState((prevState, props) => ({
                forecast: data
        }));
        })
    }

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
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
    ];

    let months = [
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
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
  <>
  <div className="App">
  
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
            placeholder="Voer een plek in..."
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
              <div className="border">
			  <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
			  </div>
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
	</div>
	
	 <FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_text} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
    );
	
	</>
  );
}

export default Search;

