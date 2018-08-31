import {combineReducers} from 'redux';
import menu_left from './menu_left';
import cats from './cats';
//import menu from '../routes/dashboard';
//console.log("three");
export default combineReducers({
  menu_left,
  cats
});
