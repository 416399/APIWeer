import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';
import updateForecastDegree from './DegreeToggle'; 

 
class WeekContainer extends React.Component {
  formatDayCards = () => {
   return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  
  }
  
    state = {
    fullData: [],
    dailyData: [],
    degreeType: "celcius",
  }
  

  componentDidMount = () => {
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.OpenWeatherKey}`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }
  
  	      updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  render() {
    return (
<div>	  
      <div className="container">
      <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
      <h5 className="display-5 text-muted">New York, US</h5>
        <div className="row justify-content-center">
    
		  {this.formatDayCards()}

        </div>
      </div>
      <div>
        <h1>Hello World!</h1>
      </div>
	  </div>
    )
  }
  
  
  
}

export default WeekContainer;