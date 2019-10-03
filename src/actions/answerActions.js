import { _saveQuestionAnswer } from '../utils/_DATA.js';
import { createActionCreator } from '../utils/utils';
import { answerActionTypes } from './types';

const saveAnswerInitiated = createActionCreator(answerActionTypes.SAVE_ANSWER_INITIATED);
const saveAnswerSuccess = createActionCreator(answerActionTypes.SAVE_ANSWER_SUCCESS);
const saveAnswerFailed = createActionCreator(answerActionTypes.FETCH_QUESTIONS_FAILED);

export const saveAnswer = (authedUser, qid, answer) => {
	return (dispatch) => {
		const requestPayload = { authedUser, qid, answer };
		dispatch(saveAnswerInitiated(requestPayload));
		_saveQuestionAnswer(requestPayload).then(() => {
			dispatch(saveAnswerSuccess());
		}).catch(error => {
			dispatch(saveAnswerFailed(error));
		});
	};
}
