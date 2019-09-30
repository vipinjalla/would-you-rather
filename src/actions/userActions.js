import {_getUsers} from '../utils/_DATA.js';
import {createActionCreator} from '../utils/utils';

export const userActionTypes = {
	FETCH_USERS_INITIATED: 'FETCH_USERS_INITIATED',
	FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
	FETCH_USERS_FAILED: 'FETCH_USERS_FAILED',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
};

const fetchUsersInitiated = createActionCreator(userActionTypes.FETCH_USERS_INITIATED);
const fetchUsersSuccess = createActionCreator(userActionTypes.FETCH_USERS_SUCCESS);
const fetchUsersFailed = createActionCreator(userActionTypes.FETCH_USERS_FAILED);
export const login = createActionCreator(userActionTypes.LOGIN);
export const logout = createActionCreator(userActionTypes.LOGOUT);

export const getUsers = () => {
	return (dispatch) => {
      	dispatch(fetchUsersInitiated());
    	_getUsers().then((users) => {
        	dispatch(fetchUsersSuccess(users));
        }).catch(error => {
        	dispatch(fetchUsersFailed(error));
        });
    };
}
