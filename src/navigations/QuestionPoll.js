import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { OPTIONS } from '../components/Question';
import ErrorPage from '../components/ErrorPage';
import Answer from './Answer';
import { Card, CardHeader, CardBody } from '../components/card';
import Poll from '../components/Poll';
import { getMyAnswer } from '../utils/utils';

export class QuestionPoll extends Component {

	renderYourVoteTag() {
		return (<div className="your-vote">Your Vote</div>);
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
		const { question } = this.props;
		if (!question) {
			return this.renderErrorPage();
		}

		if (!(this.props.user && this.props.user.loggedInUser)) {
			return (<Redirect to="/" />);
		}

		const { users, loggedInUser } = this.props.user;
		if (!(question.optionOne.votes.includes(loggedInUser) || question.optionTwo.votes.includes(loggedInUser))) {
			return (<Answer user={this.props.user} question={question} />);
		}
      
		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;

		return (
			<Card className="poll-card readonly">
				<CardHeader>
					<h5>{'Asked by' + users[question.author].name}</h5>
				</CardHeader>
				<CardBody>
					<div className="medium-card-img col-lg-3">
						<img className="card-img" src={users[question.author].avatarURL} alt="profile pic" />
					</div>
					<div className="col-lg-9">
						<h5> Result </h5>
						<div className="card active">
							<div className="card-body">
								{getMyAnswer(loggedInUser, question).text === question[OPTIONS.OPTION_ONE].text && this.renderYourVoteTag()}
								<div className="option">{question[OPTIONS.OPTION_ONE].text}</div>
								<Poll score={optionOneVotes} outOf={totalVotes} />
							</div>
						</div>
						<div className="card active">
							<div className="card-body">
								{getMyAnswer(loggedInUser, question).text === question[OPTIONS.OPTION_TWO].text && this.renderYourVoteTag()}
								<div className="option">{question[OPTIONS.OPTION_TWO].text}</div>
								<Poll score={optionTwoVotes} outOf={totalVotes} />
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default connect((state, props) => {
	const questionId = props.match.params.id;
	return {
		user: state.user,
		question: state.questions.questionsList && state.questions.questionsList[questionId]
	};
})(QuestionPoll);
