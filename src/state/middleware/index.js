import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export const appMiddleware = applyMiddleware(thunkMiddleware);
