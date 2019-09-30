import { userActionTypes } from '../../actions/userActions';
import { answerActionTypes } from '../../actions/answerActions';
import { questionsActionTypes } from '../../actions/questionsActions';

export default function userReducer(state, action) {
    const { type, payload } = action;
    let formattedQuestion;
    let nextState;
    switch (type) {
        case userActionTypes.FETCH_USERS_SUCCESS:
            nextState = { ...state, users: { ...payload } };
            break;
        case userActionTypes.LOGIN:
            nextState = { ...state, loggedInUser: payload.user };
            break;
        case userActionTypes.LOGOUT:
            nextState = {};
            break;
        case answerActionTypes.SAVE_ANSWER_INITIATED:
            nextState = {
                ...state,
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
                ...state, users: {
                    ...state.users,
                    [payload.author]: {
                        ...state.users[payload.author],
                        questions: state.users[payload.author].questions.concat([formattedQuestion.id])
                    }
                }
            };
            break;
        default:
            return { ...state };
    }

    return nextState;
}