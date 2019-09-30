import React, {Component} from 'react';

export default class Card extends Component {

	render() {
      	const className = 'card ' + (this.props.className || '');
    	return (
      		<div className={className}>
             	{this.props.children}
            </div>
      	);
    }
}