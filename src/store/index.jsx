import {combineReducers} from 'redux';
import menu_left from './menu_left';
import cats from './cats';
import auth from './auth';
import sidebar from './sidebar';
import podcat_p from './podcat_p';
//import menu from '../routes/dashboard';
//console.log(cats);
export default combineReducers({
  menu_left,
  cats,
  podcat_p,
  auth,
  sidebar

});
