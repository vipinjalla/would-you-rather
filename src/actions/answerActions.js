import {_saveQuestionAnswer} from '../utils/_DATA.js';
import {createActionCreator} from '../utils/utils';

export const answerActionTypes = {
	SAVE_ANSWER_INITIATED: 'SAVE_ANSWER_INITIATED',
	SAVE_ANSWER_SUCCESS: 'SAVE_ANSWER_SUCCESS',
	SAVE_ANSWER_FAILED: 'SAVE_ANSWER_FAILED'
};

const saveAnswerInitiated = createActionCreator(answerActionTypes.SAVE_ANSWER_INITIATED);
const saveAnswerSuccess = createActionCreator(answerActionTypes.SAVE_ANSWER_SUCCESS);
const saveAnswerFailed = createActionCreator(answerActionTypes.FETCH_QUESTIONS_FAILED);

export const saveAnswer = (authedUser, qid, answer) => {
	return (dispatch) => {
      	const requestPayload = {authedUser, qid, answer};
      	dispatch(saveAnswerInitiated(requestPayload));
    	_saveQuestionAnswer(requestPayload).then(() => {
        	dispatch(saveAnswerSuccess());
        }).catch(error => {
        	dispatch(saveAnswerFailed(error));
        });
    };
}
