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
import Reports from "views/reports/reports.jsx";
import Config from "views/config/config.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";


const sign = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
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
  {
    path: "/reports",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: Person,
    component: Reports
  },
  {
    path: "/config",
    sidebarName: "Config",
    navbarName: "Config",
    icon: Person,
    component: Config
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }

];
//sessionStorage.removeItem("id"); { redirect: true, path: "/", to: "/signin", navbarName: "Sign up" }



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
