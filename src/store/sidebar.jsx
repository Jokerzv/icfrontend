import React from "react";
import PropTypes from 'prop-types';
//import Cat from '../views/cat/cat';
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

import Settings from "@material-ui/icons/SettingsSharp";
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
import Reports from "views/reports/reports.jsx";
import Config from "views/config/config.jsx";


var sign = [
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

function isEmpty(str) {
    return (!str || 0 === str.length);
}

//console.log("new ",cats);
export default function sidebar_send(state=sign, action){

  if(!isEmpty(sessionStorage.getItem("token")) && sessionStorage.getItem("token") != "undefined"){
    state = [
      {
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: Dashboard,
        component: DashboardPage
      },
      {
        path: "/reports",
        sidebarName: "Reports",
        navbarName: "Reports",
        icon: Assignment,
        component: Reports
      },
      {
        path: "/config",
        sidebarName: "Config",
        navbarName: "Config",
        icon: Settings,
        component: Config
      },
      { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
    ];

  }else{

  state = [
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
  }

  return state;
};
