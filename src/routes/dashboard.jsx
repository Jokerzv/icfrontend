// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
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


const def = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "User profile",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/auth",
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
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  },
  { redirect: true, path: "/signin", to: "/dashboard", navbarName: "Redirect 2" }
];

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
localStorage.removeItem("id");
var dashboardRoutes = sign;


function isEmpty(str) {
    return (!str || 0 === str.length);
}

if(!isEmpty(localStorage.getItem("id"))){
   dashboardRoutes = def;

}else{
   dashboardRoutes = sign;
}


function test() {
   setInterval(() => {

    console.log(localStorage.getItem("id"));

  }, 3000);
}
test();
//console.log(dashboardRoutes);
// export default function menu_left(){
//
//   return dashboardRoutes;
// }

//console.log(dashboardRoutes);
//alert(localStorage.getItem("id"));
export default dashboardRoutes;
