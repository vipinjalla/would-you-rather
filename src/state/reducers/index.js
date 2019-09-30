import {combineReducers} from 'redux';
import userReducer from './userReducer';
import questionsReducer from './questionsReducer';
import notificationReducer from './notificationReducer';

const reducersMap = {
	user: userReducer,
  	questions: questionsReducer,
    notification: notificationReducer
};

export const rootReducer = combineReducers(reducersMap);
