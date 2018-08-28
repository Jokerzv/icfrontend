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


// const user = [
//   {
//     path: "/dashboard",
//     sidebarName: "Dashboard",
//     navbarName: "User profile",
//     icon: Dashboard,
//     component: DashboardPage
//   },
//   {
//     path: "/auth",
//     sidebarName: "Reports",
//     navbarName: "Account",
//     icon: Assignment,
//     component: Auth
//   },
//   {
//     path: "/signup",
//     sidebarName: "Config",
//     navbarName: "Registration",
//     icon: Set,
//     component: Signup
//   },
//   { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
// ];

//var dashboardRoutes = sign;

const sign = [
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



// function isEmpty(str) {
//     return (!str || 0 === str.length);
// }
//
// if(!isEmpty(sessionStorage.getItem("token"))){
//    dashboardRoutes = user;
//
// }else{
//    dashboardRoutes = sign;
// }


// function test() {
//    setInterval(() => {
//
//     //console.log(localStorage.getItem("id"));
//
//   }, 3000);
// }
// test();
//console.log(dashboardRoutes);
// export default () =>{
//   dashboardRoutes = sign;
//   console.log(dashboardRoutes);
//   return dashboardRoutes;
// }

//console.log(dashboardRoutes);
//alert(localStorage.getItem("id"));
export default sign;
