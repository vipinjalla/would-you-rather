import { _getQuestions, _saveQuestion } from '../utils/_DATA.js';
import { createActionCreator } from '../utils/utils';

export const questionsActionTypes = {
	FETCH_QUESTIONS_INITIATED: 'FETCH_QUESTIONS_INITIATED',
	FETCH_QUESTIONS_SUCCESS: 'FETCH_QUESTIONS_SUCCESS',
	FETCH_QUESTIONS_FAILED: 'FETCH_QUESTIONS_FAILED',
	SELECT_QUESTION: 'SELECT_QUESTION',
	SAVE_QUESTION_INITIATED: 'SAVE_QUESTION_INITIATED',
	SAVE_QUESTION_SUCCESS: 'SAVE_QUESTION_SUCCESS',
	SAVE_QUESTION_FAILED: 'SAVE_QUESTION_FAILED'
};

const fetchQuestionsInitiated = createActionCreator(questionsActionTypes.FETCH_QUESTIONS_INITIATED);
const fetchQuestionsSuccess = createActionCreator(questionsActionTypes.FETCH_QUESTIONS_SUCCESS);
const fetchQuestionsFailed = createActionCreator(questionsActionTypes.FETCH_QUESTIONS_FAILED);
const saveQuestionInitiated = createActionCreator(questionsActionTypes.SAVE_QUESTION_INITIATED);
const saveQuestionSuccess = createActionCreator(questionsActionTypes.SAVE_QUESTION_SUCCESS);
const saveQuestionFailed = createActionCreator(questionsActionTypes.SAVE_QUESTION_FAILED);
export const selectQuestion = createActionCreator(questionsActionTypes.SELECT_QUESTION);

export const getQuestions = () => {
	return (dispatch) => {
		dispatch(fetchQuestionsInitiated());
		_getQuestions().then((questions) => {
			dispatch(fetchQuestionsSuccess(questions));
		}).catch(error => {
			dispatch(fetchQuestionsFailed(error));
		});
	};
};

export const saveQuestion = (optionOneText, optionTwoText, author) => {
	const requestPayload = { optionOneText, optionTwoText, author };
	return (dispatch) => {
		dispatch(saveQuestionInitiated(requestPayload));
		_saveQuestion(requestPayload).then(() => {
			dispatch(saveQuestionSuccess());
		}).catch(error => {
			dispatch(saveQuestionFailed(error));
		});
	};
};
