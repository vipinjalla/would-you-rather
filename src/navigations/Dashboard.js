import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardHeader } from '../components/card';
import Question, { MODE } from '../components/Question';
import { getQuestions } from '../actions/questionsActions';
import { getMyAnswer, getUnansweredQuestions, getAnsweredQuestions } from '../utils/utils';

export class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            view: MODE.UNANSWERED,
            currentAnsweringQuestion: null
        };
    }

    componentDidMount() {
        this.props.dispatch(getQuestions());
    }

    onActionHandler(question) {
        const { view } = this.state;
        if (view === MODE.ANSWERED || view === MODE.UNANSWERED) {
            this.props.history.push(`/questions/${question.id}`);
        }
    }

    renderDashboardHeader() {
        const { view } = this.state;

        if (view === MODE.ANSWERING) {
            return null;
        }

        return (
            <CardHeader>
                <div className="card-columns">
                    <div className={view === MODE.UNANSWERED ? 'card bg-info' : 'card bg-light'} onClick={() => this.setState({ view: MODE.UNANSWERED })}>
                        <div className="card-body text-center">
                            <p className="card-text">Unanswered Questions</p>
                        </div>
                    </div>
                    <div className={view === MODE.ANSWERED ? 'card bg-info' : 'card bg-light'} onClick={() => this.setState({ view: MODE.ANSWERED })}>
                        <div className="card-body text-center">
                            <p className="card-text">Answered Questions</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
        );
    }

    renderDashboardQuestion(question, index) {
        const { view } = this.state;
        const { user } = this.props;
        const { users } = user;
        let answer = {};
        if (view === MODE.ANSWERED) {
            answer = getMyAnswer(user.loggedInUser, question);
        }
        return (
            <Question
                key={index}
                author={users[question.author].name}
                avatarURL={users[question.author].avatarURL}
                mode={view}
                question={question}
                answer={answer}
                onAction={() => this.onActionHandler(question)}
            />
        );
    }

    renderDashboardCards() {
        const { view } = this.state;
        if (view === MODE.ANSWERING) {
            return null;
        }

        const { user } = this.props;
        let questionsList = [];

        if (view === MODE.UNANSWERED) {
            questionsList = getUnansweredQuestions(user.loggedInUser, this.props.questionsList);
        } else {
            questionsList = getAnsweredQuestions(user.loggedInUser, this.props.questionsList);
        }

        if (questionsList.length === 0) {
            if (this.props.isLoading) {
                return (<Question mode={MODE.NO_RESULT} emptyMessage="Loading..." />);
            }
            return (<Question mode={MODE.NO_RESULT} emptyMessage="No more questions." />);
        }

        return questionsList.map((question, index) => this.renderDashboardQuestion(question, index));
    }

    render() {
        if (!(this.props.user && this.props.user.loggedInUser)) {
            return (<Redirect to="/" />);
        }

        return (
            <Card className="dashboard">
                {this.renderDashboardHeader()}
                {this.renderDashboardCards()}
            </Card>
        );
    }
}

export default connect(state => {
    const { questionsList = {}, isLoading } = state.questions;
    return {
        user: state.user,
        questionsList: Object.values(questionsList).sort((q1, q2) => q2.timestamp - q1.timestamp),
        isLoading
    };
})(Dashboard);