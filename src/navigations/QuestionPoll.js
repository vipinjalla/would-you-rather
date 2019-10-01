import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OPTIONS } from '../components/Question';
import ErrorPage from '../components/ErrorPage';

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
		if (!(this.props.user && this.props.user.loggedInUser)) {
			this.props.history.push('/');
          	return null;
		}
      
      	const {questionsList} = this.props.questions;
      	const pathnames = this.props.location.pathname.split("/");
		if (pathnames.length !== 3) {
  			return this.renderErrorPage();
        }
      	const questionId = pathnames[2];
      	const question = questionsList[questionId];
      
		if (!question) {
  			return this.renderErrorPage();
        }
      
		const { users, loggedInUser } = this.props.user;
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

export default connect(state => {
	return {
		user: state.user,
		questions: state.questions
	};
})(QuestionPoll);
