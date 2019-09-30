import React, {Component} from 'react';

export default class CardBody extends Component {
	
  	render() {
      const className = 'card-body ' + (this.props.className || '')
      return (
		<div className={className}>
			{this.props.children}
		</div>
      );
    }
}