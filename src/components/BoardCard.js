import React, { Component } from 'react';
import { Card, CardBody } from './card';
import PropTypes from 'prop-types';

export default class BoardCard extends Component {

    static get propTypes() {
        return {
            name: PropTypes.string,
            avatarURL: PropTypes.string,
            numberOfAnsweredQuestions: PropTypes.number,
            numberOfCreatedQuestions: PropTypes.number
        };
    }

    static get defaultProps() {
        return {
            numberOfAnsweredQuestions: 0,
            numberOfCreatedQuestions: 0
        }
    }

    render() {
        const { name, avatarURL, numberOfAnsweredQuestions, numberOfCreatedQuestions } = this.props;
        const score = numberOfAnsweredQuestions + numberOfCreatedQuestions;

        return (
            <Card className="leader-board-card">
                <CardBody className="card-body leader-board-card-body">
                    <div className="card-left-part col-lg-3">
                        <img className="card-img medium-card-img" src={avatarURL} alt="logo" />
                    </div>
                    <div className="card-middle-part col-lg-6">
                        <h5>{name}</h5>
                        <div className="label-group">
                            <div className="label">
                                <div className="key">Answered questions:</div>
                                <div className="value">{numberOfAnsweredQuestions}</div>
                            </div>
                            <div className="label">
                                <div className="key">Created questions:</div>
                                <div className="value">{numberOfCreatedQuestions}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-right-part col-lg-3">
                        <div className="card">
                            <div className="card-header">Score</div>
                            <div className="card-body">
                                <h5 className="amount-in-filled-circle">{score}</h5>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}