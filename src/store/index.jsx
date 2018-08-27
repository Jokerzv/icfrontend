import {combineReducers} from 'redux';
import menu_left from './menu_left';
import menu from '../routes/dashboard';

export default combineReducers({
  menu_left,
  menu
});
