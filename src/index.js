import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Weather from './components/weather';

class App extends Component {
  
  constructor(props){
  	super(props);

  	this.state = { lat : '' ,
  					lon : ''
    			};
  }

  componentDidMount()
  {
  	if(navigator.geolocation){
  		navigator.geolocation.getCurrentPosition((position) => this.setState({ lon : position.coords.longitude, lat :position.coords.latitude }));
  	}
    document.body.style.backgroundColor = "#fffde7";

  }


  render() {
    return (
    	<div className="wholemargin">
    		<div className='card-panel large deep-purple darken-3'>
    			<Weather lat = {this.state.lat} lon = {this.state.lon} />
    		</div>
    	</div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));