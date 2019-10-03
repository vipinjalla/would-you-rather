import { questionsActionTypes } from '../../actions/types';

export default function notificationReducer(state = {}, action) {
	const { type } = action;
	let nextState;
	switch (type) {
		case questionsActionTypes.SAVE_QUESTION_INITIATED:
			nextState = { ...state, toastSuccessMessage: null, toastErrorMessage: null };
			break;
		case questionsActionTypes.SAVE_QUESTION_SUCCESS:
			nextState = { ...state, toastSuccessMessage: 'Question added successfully...!!!' };
			break;
		case questionsActionTypes.SAVE_QUESTION_FAILED:
			nextState = { ...state, toastErrorMessage: 'Unable to add question. Please try again.' };
			break;
		default:
			return state;
	}

	return nextState;
}        