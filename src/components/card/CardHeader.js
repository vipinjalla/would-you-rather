import React, {Component} from 'react';

export default class CardHeader extends Component {
	
  	render() {
      const className = 'card-header ' + (this.props.className || '')
      return (
		<div className={className}>
			{this.props.children}
         </div>
      );
    }
}