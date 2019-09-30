import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveAnswer} from '../actions/answerActions';
import Question, {MODE} from '../components/Question';

export class Answer extends Component {
  	
  
    handleSaveAnswer(question, answer) {
      this.props.dispatch(saveAnswer(this.props.user.loggedInUser, question.id, answer));
      this.props.history.push('/poll');
    }

	render() {
      if (!(this.props.user && this.props.user.loggedInUser)) {
        this.props.history.push('/');      
      }
      
      const {users} = this.props.user;
      const {currentAnsweringQuestion: question} = this.props.questions;

      return (
        <Question
        	author={users[question.author].name}
            authorPicURL={users[question.author].avatarURL}
            mode={MODE.ANSWERING}
            question={question}
            onAction={(answer) => this.handleSaveAnswer(question, answer)}
        />
      );
  }
}

export default connect(state => {
  return {
    user: state.user,
    questions: state.questions
  };
})(Answer);