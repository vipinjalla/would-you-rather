import {createStore} from 'redux';
import {rootReducer} from './reducers';
import {appMiddleware} from './middleware';

export const configureStore = () => {
	return createStore(rootReducer, {}, appMiddleware);
}