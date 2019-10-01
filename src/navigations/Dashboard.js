import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from '../components/card';
import Question, { MODE } from '../components/Question';
import { getQuestions, selectQuestion } from '../actions/questionsActions';
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
        if (view === MODE.UNANSWERED) {
	        this.props.dispatch(selectQuestion({ selectQuestion: question }));
            this.props.history.push('/answer');
          
        } else if (view === MODE.ANSWERED) {
	        this.props.history.push('/questions/' + question.id);
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

        const { user, questions } = this.props;
        let questionsList = [];

        if (view === MODE.UNANSWERED) {
            questionsList = getUnansweredQuestions(user.loggedInUser, questions.questionsList);
        } else {
            questionsList = getAnsweredQuestions(user.loggedInUser, questions.questionsList);
        }

        if (questionsList.length === 0) {
            if (this.props.questions.isLoading) {
                return (<Question mode={MODE.NO_RESULT} emptyMessage="Loading..." />);
            }
            return (<Question mode={MODE.NO_RESULT} />);
        }

        return questionsList.map((question, index) => this.renderDashboardQuestion(question, index));
    }

    render() {
        if (!(this.props.user && this.props.user.loggedInUser)) {
            this.props.history.push('/');
          	return null;
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
    return {
        user: state.user,
        questions: state.questions
    };
})(Dashboard);