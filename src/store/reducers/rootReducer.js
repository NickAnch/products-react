import { combineReducers } from 'redux';
import productReducer from './product';
import authReducer from './auth';

export default combineReducers({
  product: productReducer,
  auth: authReducer,
});
