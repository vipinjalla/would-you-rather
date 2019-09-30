import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, login } from '../actions/userActions';
import { Card, CardHeader, CardBody } from '../components/card';

export class Login extends Component {

    constructor() {
        super();
        this.selectElementref = null;
    }

    componentDidMount() {
        this.props.dispatch(getUsers());
    }

    handleLogin() {
        if (this.selectElementref) {
            this.props.dispatch(login({ user: this.selectElementref.value }));
            this.props.history.push('/home');
        }
    }

    renderHeader() {
        return (
            <CardHeader>
                <h5>
                    Welcome to the Would You Rather App!
                </h5>
                <h6>
                    Please sign in to continue
                </h6>
            </CardHeader>
        );
    }

    renderUsers() {
        const { users = {} } = this.props;
        const markup = [];
        for (const userKey in users) {
            markup.push((<option key={userKey} value={userKey}>{users[userKey].name}</option>));
        }
        return markup;

    }

    renderBody() {
        return (
            <CardBody>
                <div className="login-form">
                    <img className="card-img-top logo" src="./images/logo.svg" alt="logo" />
                    <h4>Sign In</h4>
                    <select className="form-control" ref={selectElementref => this.selectElementref = selectElementref}>
                        {this.renderUsers()}
                    </select>
                    <button className="form-control btn btn-primary" onClick={() => this.handleLogin()}>Sign In</button>
                </div>
            </CardBody>
        );
    }

    render() {
        return (
            <Card className="card-login">
                {this.renderHeader()}
                {this.renderBody()}
            </Card>
        );
    }
}

export default connect((state) => {
    return {
        users: state.user.users
    };
})(Login);
