import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';
import { saveAnswer } from '../actions/answerActions';
import Question, { MODE } from '../components/Question';

export class Answer extends Component {


    handleSaveAnswer(question, answer) {
        this.props.dispatch(saveAnswer(this.props.user.loggedInUser, question.id, answer));
        this.props.history.push('/questions/' + question.id);
    }

    renderErrorPage() {
        return (
            <ErrorPage
                title="Error 404 !!!"
                description="Question not found"
            />
        );
    }

    render() {
        if (!(this.props.user && this.props.user.loggedInUser)) {
            return (<Redirect to="/" />);
        }

        const { question } = this.props;
        if (!question) {
            return this.renderErrorPage();
        }

        const { users } = this.props.user;
        return (
            <Question
                author={users[question.author].name}
                avatarURL={users[question.author].avatarURL}
                mode={MODE.ANSWERING}
                question={question}
                onAction={(answer) => this.handleSaveAnswer(question, answer)}
            />
        );
    }
}

export default withRouter(connect()(Answer));