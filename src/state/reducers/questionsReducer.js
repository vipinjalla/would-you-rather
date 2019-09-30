import { questionsActionTypes } from '../../actions/questionsActions';
import { answerActionTypes } from '../../actions/answerActions';
import { userActionTypes } from '../../actions/userActions';

export default function questionsReducer(state, action) {
    const { type, payload } = action;
    let formattedQuestion;
    let nextState;
    switch (type) {
        case questionsActionTypes.FETCH_QUESTIONS_INITIATED:
            nextState = { ...state, isLoading: true, toastSuccessMessage: false, toastErrorMessage: false };
            break;
        case questionsActionTypes.FETCH_QUESTIONS_FAILED:
            nextState = { ...state, questionsList: { ...payload }, isLoading: false, toastErrorMessage: true };
            break;
        case questionsActionTypes.FETCH_QUESTIONS_SUCCESS:
            nextState = { ...state, questionsList: { ...payload }, isLoading: false, toastSuccessMessage: true };
            break;
        case questionsActionTypes.SELECT_QUESTION:
            nextState = { ...state, currentAnsweringQuestion: payload.selectQuestion };
            break;
        case questionsActionTypes.SAVE_QUESTION_INITIATED:
              formattedQuestion = {
                    id: 'newQuestionTempID',
                    timestamp: Date.now(),
                    author: payload.author,
                    optionOne: {
                        votes: [],
                        text: payload.optionOneText,
                    },
                    optionTwo: {
                        votes: [],
                        text: payload.optionTwoText,
                    }
            };
            nextState = {
                ...state, ...{
                    ...state.questionsList,
                    [formattedQuestion.id]: formattedQuestion
                }
            };
            break;
        case answerActionTypes.SAVE_ANSWER_INITIATED:
            nextState = {
                ...state,
                questionsList: {
                    ...state.questionsList,
                    [payload.qid]: {
                        ...state.questionsList[payload.qid],
                        [payload.answer]: {
                            ...state.questionsList[payload.qid][payload.answer],
                            votes: state.questionsList[payload.qid][payload.answer].votes.concat([payload.author])
                        }
                    }
                }
            };
            break;
        case userActionTypes.LOGOUT:
            nextState = {}
            break;
        default:
            return { ...state };
    }

    return nextState;
}