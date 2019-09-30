import {userActionTypes} from '../../actions/userActions';
import {answerActionTypes} from '../../actions/answerActions';

export default function userReducer (state, action) {
  	const {type, payload} = action;
  	let nextState;
  	switch(type) {
      case userActionTypes.FETCH_USERS_SUCCESS:
      	nextState = {...state, users: {...payload}};
      break;
      case userActionTypes.LOGIN:
        nextState = {...state, loggedInUser: payload.user};
      break;
      case userActionTypes.LOGOUT:
        nextState = {};
      break;
      case answerActionTypes.SAVE_ANSWER_INITIATED:
        nextState = {...state, 
                     users: {
                     ...state.users,
                     [payload.authedUser]: {
                       ...state.users[payload.authedUser],
                         answers: {
                           ...state.users[payload.authedUser].answers,
                             [payload.qid]: payload.answer
                         }
                     }
    			}
			};
      break;
      default:
        return {...state};
   	}
  
	return nextState;
}