import React, {Component} from 'react';
import {connect} from 'react-redux';
import BoardCard from '../components/BoardCard';
import {getUsers} from '../actions/userActions';
import {getQuestions} from '../actions/questionsActions';
import {getAnsweredQuestions} from '../utils/utils';

export class LeaderBoard extends Component {
  
  componentDidMount() {
      this.props.dispatch(getUsers());
      this.props.dispatch(getQuestions());
  }
  
  getUsersSortedByScore() {
	const {user={}, questions={}} = this.props;
    const {users={}} = user;
    const {questionsList={}} = questions;
  	return Object.values(users).map(user => {
      const numberOfAnsweredQuestions = getAnsweredQuestions(user.id, questionsList).length;
      const numberOfCreatedQuestions = user.questions.length;
      const score = numberOfAnsweredQuestions + numberOfCreatedQuestions;
      return {
        	name: user.name,
          	avatarURL: user.avatarURL,
            numberOfAnsweredQuestions,
            numberOfCreatedQuestions,
			score
      };
    }).sort((user1, user2) => user2.score - user1.score);    
  }
  
  renderBoardCards() {
  	return this.getUsersSortedByScore().map((user, index) => {
      return (
		<BoardCard
        	key={index}
        	name={user.name}
          	avatarURL={user.avatarURL}
            numberOfAnsweredQuestions={user.numberOfAnsweredQuestions}
            numberOfCreatedQuestions={user.numberOfCreatedQuestions}
			score={user.score}
        />      
      );
    });
  }
  
  render() {
	return (
      <div>
      	{this.renderBoardCards()}      
      </div>
    );
  }
}

export default connect(state => {
  return {
    user: state.user,
    questions: state.questions
  };
})(LeaderBoard);