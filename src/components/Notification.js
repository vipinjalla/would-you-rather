import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Notification extends Component {
	constructor() {
		super();
		this.state = {
			toastSuccessMessage: null,
			toastErrorMessage: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.notification.toastSuccessMessage && nextProps.notification.toastSuccessMessage) {
			setTimeout(() => this.setState({ toastSuccessMessage: null }), 3000);
			this.setState({ toastSuccessMessage: nextProps.notification.toastSuccessMessage });
		}

		if (!this.props.notification.toastErrorMessage && nextProps.notification.toastErrorMessage) {
			setTimeout(() => this.setState({ toastSuccessMessage: null }), 3000);
			this.setState({ toastErrorMessage: nextProps.notification.toastErrorMessage });
		}

	}

	render() {
		if (this.state.toastSuccessMessage) {
			return (
				<div className="alert alert-success">
					<strong>Success!&nbsp;&nbsp;</strong>
					{this.state.toastSuccessMessage}
				</div>
			);
		}

		if (this.state.toastErrorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Error!&nbsp;&nbsp;</strong>
					{this.state.toastErrorMessage}
				</div>
			);
		}

		return null;
	}
}

export default connect((state) => {
	return {
		notification: state.notification
	};
})(Notification);