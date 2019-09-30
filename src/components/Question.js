import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from './card';
import PropTypes from 'prop-types';

export const MODE = {
	ANSWERED: 'ANSWERED',
  	UNANSWERED: 'UNANSWERED',
  	ANSWERING: 'ANSWERING',
  	NO_RESULT: 'NO_RESULT'
}

export const OPTIONS = {
	OPTION_ONE: 'optionOne',
  	OPTION_TWO: 'optionTwo'
};

export default class Question extends Component {
  	
  	constructor() {
      super();
      this.state = {
        answer: null
      };
    }
  
  	static get propTypes() {
        return {
            author: PropTypes.string,
            avatarURL: PropTypes.string,
            mode: PropTypes.string,
            question: PropTypes.object,
            answer: PropTypes.string,
            onAction: PropTypes.func,
          	emptyMessage: PropTypes.string
        };
    }
  	
  	static get defaultProps() {
      	return {
          emptyMessage: 'No data available'
        }
    }
	
  	renderOptions() {
    	const {question, mode, answer} = this.props;
      	if (mode === MODE.UNANSWERED) {
          return (
            <div className="options">
                <label className="checkbox-inline">
                    <div className="option-text">{question[OPTIONS.OPTION_ONE].text}</div>
                </label>
                <label className="checkbox-inline">
                    <div className="option-text">{question[OPTIONS.OPTION_TWO].text}</div>
                </label>
            </div>      
          );
    	} else if (mode === MODE.ANSWERED) {
          return (
            <div className="options">
                <label className="checkbox-inline">
                    <div className="option-text">{answer.text}</div>
                </label>
            </div>      
          );
    	} else {
          return (
            <div className="options">
              <label className="checkbox-inline">
                <input type="radio" name="answer" value="" onChange={() => this.setState({answer: OPTIONS.OPTION_ONE})} />
                <div className="option-text">{question[OPTIONS.OPTION_ONE].text}</div>
             </label>
             <label className="checkbox-inline">
                <input type="radio" name="answer" value="" onChange={() => this.setState({answer: OPTIONS.OPTION_TWO})} />
                <div className="option-text">{question[OPTIONS.OPTION_TWO].text}</div>
              </label>
            </div>
          );
        }
    }
  
	renderActionButton() {
    	const {mode} = this.props;
		let label = 'Submit';
      	if (mode === MODE.ANSWERED) {
        	label = 'View Poll'; 
        } else if (mode === MODE.UNANSWERED) {
        	label = 'Answer'; 
        }
        return (
          <button className="form-control btn btn-primary" onClick={()=> this.props.onAction(this.state.answer)}>{label}</button>
        );
    }

	render() {
      	
      	if (this.props.mode === MODE.NO_RESULT) {
         	return (
              <Card className="question-card readonly"> 
              	<CardBody>
              		<h5>{this.props.emptyMessage}</h5>
              	</CardBody>
              </Card>
            );
        }
      
      	const {author='', avatarURL} = this.props;
    	return (
			<Card className="question-card readonly">
				<CardHeader>
					<div className="question-card-title">
						{author + ' asks...'}
					</div>
				</CardHeader>
				<CardBody>
				  <div className="card-left-part col-lg-3">
					  <img className="card-img medium-card-img" src={avatarURL} alt="profile pic" />
				  </div>
				  <div className="question-div col-lg-9">
					  <h6 className="question-title">Would you rather...</h6>
					  {this.renderOptions()}
					  {this.renderActionButton()}
					  {this.props.children}
				  </div>
				</CardBody>
			</Card>
        );
    }
}