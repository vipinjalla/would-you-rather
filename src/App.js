import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Notification from './components/Notification';
import {getRoutes} from './navigations';
import './index.css';

class App extends Component {
  	render() {
    	return (
        	<Router>         
          		<section className="app-content">
          			<AppHeader />
          			<Notification />
          			<div className="container app-container">
          				{getRoutes()}
  					</div>
              	</section>
  			</Router>         
        );
  	}
}

export default App;
