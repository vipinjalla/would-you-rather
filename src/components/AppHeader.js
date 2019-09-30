import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {logout} from '../actions/userActions';

export class AppHeader extends Component {
  
  	constructor() {
    	super();
      	this.state = {
        	currentRoute: '/'
        };
    }
  
  	renderLeftPart() {
    	return (
          <div className="header-left-part col-lg-3">
          	<div className="navbar-header">
              <a className="navbar-brand" href="#">
          			<h4>Would you rather...</h4>
          	  </a>
          	</div>
          </div>
        );
    }
  
  	renderMiddlePart() {
    	return (
          <div className="header-middle-part col-lg-5">
          	<ul className="nav nav-pills">
            	<li className="nav-item">
                	<NavLink className={'nav-link ' + (this.state.currentRoute === '/home' ? 'active' : '') } to="/home">Home</NavLink>
          		</li>
                <li className="nav-item">
                	<NavLink className={'nav-link ' + (this.state.currentRoute === '/create-question' ? 'active' : '') } to="/create-question">New Question</NavLink>
                </li>
                <li className="nav-item">
                	<NavLink className={'nav-link ' + (this.state.currentRoute === '/leader-board' ? 'active' : '') } to="/leader-board">Leader Board</NavLink>
                </li>
            </ul>
          </div>        
        );
    }
  
  	renderLoggedInUser() {
      	const {users, loggedInUser} = this.props.user;
      	if (!users || !loggedInUser) {
            return null;
        }
    	return (
			<div className="logged-in-user">
          		<div className="greet">Hello,</div>
                <div className="logged-in-user-name">{users[loggedInUser].name}</div>
                <div className="logged-in-user-pic">
                	<img className="card-img" src={users[loggedInUser].avatarURL} alt="logo" />
                </div>
            </div>        
        );
    }
  
  	renderRightPart() {
		const {loggedInUser} = this.props.user;      
		if (!loggedInUser) {
        	return (
              <div className="header-right-part col-lg-4">
          		  {this.renderLoggedInUser()}
                  <ul className="nav nav-pills">
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/" onClick={() => window.location = '/'}>Login</NavLink>
                      </li>
                  </ul>
              </div>
          );
        }
    	return (
              <div className="header-right-part col-lg-4">
          		  {this.renderLoggedInUser()}
                  <ul className="nav nav-pills">
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/" onClick={() => this.props.dispatch(logout())}>Logout</NavLink>
                      </li>
                  </ul>
              </div>
        );
    }

  	render() {
    	return (
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
          	{this.renderLeftPart()}
  			{this.renderMiddlePart()}
  			{this.renderRightPart()}
          </nav>
        );
    }
}

export default connect((state) => {
	return {
    	user: state.user
    }
})(AppHeader);