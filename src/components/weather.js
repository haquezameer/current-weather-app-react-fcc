import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

const API_KEY = '5072591a6f81da55686d7fc6db5ccb35';

const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

const weather_name = []

 const list  = ["clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"]

class Weather extends Component{

	constructor(props){
		super(props);

		this.state = { weather : '', 
						description : '',
						city : '',
						celsiF: 'C'
					};
	}

	celsiusToFaren(){
		if(this.state.celsiF === 'C')
		{
			const c = this.state.weather;
			const f = ( c * (9/5)) + 32;
			this.setState({weather: _.round(f),
							celsiF: 'F'
						});
		}
		else{
			const f = this.state.weather;
			const c = (f-32)/(9/5);
			this.setState({weather: _.round(c),
							celsiF: 'C'
						});
		}

	}	

	renderhelp(){
		return(
				<div className="card-panel grey lighten-5 hoverable">
						<div className="center-align">
						<span className="card-title text-white">
									{this.state.city}
						</span>
						</div>
						<div className="center-align">
								<canvas  id="icon1" width="100" height="100"></canvas>
						</div>
						<div className="center-align">
							<span className="card-content">{this.state.weather}</span>
							<span><button className='btn btn-floating btn-large pulse' onClick={this.celsiusToFaren.bind(this)}>{this.state.celsiF}</button></span>
						</div>
						<div className="center-align">
							<span className="card-content">
									{this.state.description}
							</span>
						</div>
				</div>
			);
	}
	componentWillReceiveProps(nextProps){
		const lat = nextProps.lat;
		const lon = nextProps.lon;
		const URL = `${ROOT_URL}&lat=${lat}&lon=${lon}`;
		const request=axios.get(URL);
		request.then((response) => this.setState({weather : (_.round(response.data.main.temp - 273)),
													description : response.data.weather[0].description,
													city : response.data.name
												}));
	
	_.delay(this.setIco.bind(this),2000);
	}

	setIco(){
		var skycons = new Skycons({"color": "black"});
		let desc = this.state.description;
		let ico = '';
		console.log(desc);
		if(desc.indexOf('cloud') >= 1)
			ico = list[2];


		else if(desc.indexOf('rain') >= 1)
			ico = list[5];

		else if(desc.indexOf('clear') >= 1)
			ico = list[0];


		else if(desc.indexOf('snow')  >= 1)
			ico = list[7];
		

		else if(desc.indexOf('wind') >= 1)
			ico = list[8];


		else if(desc.indexOf('fog') >= 1)
			ico = list[9];

		else 
			ico = list[6];

		skycons.add("icon1", ico)
		skycons.play();
	}



	render(){
		if(!this.state)
		{
			return( 
					<div>Loading....</div>
				);
		}
		return (
					<div className="card-panel grey lighten-3">
					{this.renderhelp()}
					</div>
				);				
	}
}

export default Weather;