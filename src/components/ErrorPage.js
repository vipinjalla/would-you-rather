import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from './card';

export default class ErrorPage extends Component {

    static get propTypes() {
        return {
            title: PropTypes.string,
            description: PropTypes.string
        };
    }

    static get defaultProps() {
        return {
            title: 'Error',
            description: 'Unable to load !!!'
        }
    }

    render() {
        return (
            <Card className="error-page">
                <CardHeader className="title">
                    <h3>
                        {this.props.title}
                    </h3>
                </CardHeader>
                <CardBody className="description">
                    <h5>
                        {this.props.description}
                    </h5>
                </CardBody>
            </Card>
        );
    }
}