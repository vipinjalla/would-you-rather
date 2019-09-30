import {userActionTypes} from '../../actions/userActions';
import history from '../../utils/history';

export default (store) => next => action => {
/*	const {type} = action;
  	switch(type) {
      case userActionTypes.LOGIN:
        history.push('/home');
      break;
      case userActionTypes.LOGOUT:
         history.push('/');
      break;
      default:
        break;
    }
*/  	next(action);
}