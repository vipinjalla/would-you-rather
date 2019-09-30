import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardBody} from '../components/card';
import {saveQuestion} from '../actions/questionsActions';

export class NewQuestion extends Component {
  
  	constructor() {
    	super();
      	this.state={
        	optionOneText: '',
          	optionTwoText: ''
        };
    }
  
  	submitQuestion() {
    	const {optionOneText, optionTwoText} = this.state;
      	const {loggedInUser} = this.props.user;
    	this.props.dispatch(saveQuestion(optionOneText, optionTwoText, loggedInUser));
      	this.setState({
        	optionOneText: '',
          	optionTwoText: ''
        });
    }
  
  	renderHeader() {
      	return (
          <CardHeader>
            <h5>
	            Create New Question
            </h5>
          </CardHeader>
        );
    }
  	
	renderContent() {
    	return (
			<CardBody className="question-card">
				<div className="question-form">
					<h6 className="question-title">Would you rather...</h6>
					<input type="text" className="form-control" 
          				placeholder="Enter Option One Text Here" 
          				value={this.state.optionOneText} 
  						onChange={(e) => this.setState({optionOneText: e.target.value})}
  					/>
					<div className="col-lg-12 or-border">
						<div className="col-lg-5 or-border-item">&nbsp;</div>
						<h3 className="col-lg-2 or-item">OR</h3>
						<div className="col-lg-5 or-border-item">&nbsp;</div>
						<div></div>
					</div>
					<input type="text" className="form-control" 
						placeholder="Enter Option Two Text Here" 
						value={this.state.optionTwoText} 
  						onChange={(e) => this.setState({optionTwoText: e.target.value})}
					/>
					<button className="form-control btn btn-primary" onClick={() => this.submitQuestion()}>Submit</button>
				</div>
			</CardBody>
        );
    }
  
	render() {
		if (!(this.props.user && this.props.user.loggedInUser)) {
			this.props.history.push('/');      
        }

    	return (
			<Card>
          		{this.renderHeader()}
  				{this.renderContent()}
			</Card>
        );
    }
}

export default connect((state) => {
	return {
      user: state.user,
      questions: state.questions,
      notification: state.notification
    };
})(NewQuestion);
