import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Poll extends Component {

	static get propTypes() {
		return {
			minValue: PropTypes.number,
			maxValue: PropTypes.number,
			score: PropTypes.number,
			outOf: PropTypes.number,
		};
	}

	static get defaultProps() {
		return {
			minValue: 0,
			maxValue: 100,
			score: 1,
			outOf: 100,
		}
	}

	render() {
		const { minValue, maxValue, score, outOf } = this.props;
		const progressInPercentage = parseInt((score / outOf) * 100, 10);

		return (
			<div className="progress">
				<div className="progress-bar bg-success" role="progressbar" aria-valuenow="40"
					aria-valuemin={minValue} aria-valuemax={maxValue} style={{ width: (progressInPercentage + '%') }}>
					{progressInPercentage > 0 && progressInPercentage + '% votes...!!!'}
				</div>
			</div>
		);
	}
}
