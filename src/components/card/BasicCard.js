import React, {Component} from 'react';

export default class BasicCard extends Component {
	
  	renderCardHeader() {
    	return null;
    }

	renderCardBody() {
    	return null;
    }
  
  	render() {
      const className = 'card ' + (this.props.className || '')
      return (
		<div className={className}>
         	{this.renderCardHeader()}
         	{this.renderCardBody()}
         </div>
      );
    }
}