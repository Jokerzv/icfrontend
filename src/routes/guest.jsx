import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Set from "@material-ui/icons/SettingsSharp";
import Assignment from "@material-ui/icons/Assignment";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Auth from "views/Auth/Auth.jsx";
import Signup from "views/Signup/Signup.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";


var sign2 = [
  {
    path: "/signin",
    sidebarName: "Sign in",
    navbarName: "Sign In",
    icon: Person,
    component: Auth
  },
  {
    path: "/signup",
    sidebarName: "Sign Up",
    navbarName: "Sign Up",
    icon: Person,
    component: Signup
  },
  { redirect: true, path: "/", to: "/signin", navbarName: "Sign up" }
];
//sessionStorage.removeItem("id");
//console.log(sign2);

class sign extends React.Component {

render(){
  return (sign2);
}
}
//console.log(sign);
export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    //add_login:(value) => dispatch({type: 'SING_UP', payload: value}),
    auth_send:(value) => dispatch({type: 'auth_true', payload: value})
  })
)(sign);
