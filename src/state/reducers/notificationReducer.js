import {questionsActionTypes} from '../../actions/questionsActions';
// import {answerActionTypes} from '../../actions/answerActions';
// import {userActionTypes} from '../../actions/userActions';

export default function notificationReducer (state, action) {
  	const {type} = action;
  	let nextState;
  	switch(type) {
//      case questionsActionTypes.FETCH_QUESTIONS_INITIATED:
      case questionsActionTypes.SAVE_QUESTION_INITIATED:
//      case answerActionTypes.SAVE_ANSWER_INITIATED:
//      case userActionTypes.FETCH_USERS_INITIATED:
      	nextState = {...state, toastSuccessMessage: null, toastErrorMessage: null};
      break;
//      case questionsActionTypes.FETCH_QUESTIONS_SUCCESS:
      case questionsActionTypes.SAVE_QUESTION_SUCCESS:
//      case answerActionTypes.SAVE_ANSWER_SUCCESS:
//      case userActionTypes.FETCH_USERS_SUCCESS:
      	nextState = {...state, toastSuccessMessage: 'Question added successfully...!!!'};
      break;
//	  case questionsActionTypes.FETCH_QUESTIONS_FAILED:        
	  case questionsActionTypes.SAVE_QUESTION_FAILED:        
//      case answerActionTypes.SAVE_ANSWER_FAILED:
//      case userActionTypes.FETCH_USERS_FAILED:
      	nextState = {...state, toastErrorMessage: 'Unable to add question. Please try again.'};
      break;
      default:
        return {...state};
   	}
  
	return nextState;
}        