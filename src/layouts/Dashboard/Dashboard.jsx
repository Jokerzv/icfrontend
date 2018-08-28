/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";
import loginuser from "routes/user.jsx";
import guest from "routes/guest.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import { connect } from 'react-redux'


var koko = 0;
 var t = 0;


function isEmpty(str) {
    return (!str || 0 === str.length);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      auth: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

   test () {
     if(t == 0){
      setTimeout(() => {

      //console.log("up test");


      if(!isEmpty(sessionStorage.getItem("token"))){
         this.setState({auth : true});
         console.log("123");
         t = 1;

      }else{
         this.setState({auth : false});
      }

this.test();

    }, 1000);
  }

  }




  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) { console.log(this.state.mobileOpen);
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  loginout = (classes, ...rest) => {
    return(
      <Sidebar
        routes={dashboardRoutes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={this.handleDrawerToggle}
        open={this.state.mobileOpen}
        color="blue"
        {...rest}
      />
    )
  }
  loginok =(classes, ...rest) => {
    return(
      <Sidebar
        routes={loginuser}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={this.handleDrawerToggle}
        open={this.state.mobileOpen}
        color="blue"
        {...rest}
      />
    )
  }



  render() {
    this.test();
    if(this.state.auth == false){

    const switchRoutes = (
      <Switch>
        {guest.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );

    const user = (
      <Switch>
        {loginuser.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );
    const { classes, ...rest } = this.props;
    //const auth = (this.state.auth === false) ? this.switchRoutes : this.user;
    const auth2 = (this.state.auth === false) ? this.loginout(classes, ...rest) : this.loginok(classes, ...rest);

  // console.log("newwww ", this.props.menu_left[0].pass);
  //console.log("newwww ", this.props.menu_left[0].pass);
  //const texter = this.props.menu_left[0].pass;

  // function test() {
  //    setInterval(() => {
  //      i++;
  //     console.log(i);
  //
  //   }, 1000);
  // }
  // test();

    return (
      <div className={classes.wrapper}>
      <Sidebar
        routes={guest}
        logoText={"home-expenses"}
        logo={logo}
        image={image}
        handleDrawerToggle={this.handleDrawerToggle}
        open={this.state.mobileOpen}
        color="blue"
        {...rest}
      />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }else{

    const switchRoutes = (
      <Switch>
        {dashboardRoutes.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );

    const user = (
      <Switch>
        {loginuser.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );
    const { classes, ...rest } = this.props;
    //const auth = (this.state.auth === false) ? this.switchRoutes : this.user;
    const auth2 = (this.state.auth === false) ? this.loginout(classes, ...rest) : this.loginok(classes, ...rest);

  // console.log("newwww ", this.props.menu_left[0].pass);
  //console.log("newwww ", this.props.menu_left[0].pass);
  //const texter = this.props.menu_left[0].pass;

  // function test() {
  //    setInterval(() => {
  //      i++;
  //     console.log(i);
  //
  //   }, 1000);
  // }
  // test();

    return (
      <div className={classes.wrapper}>
      <Sidebar
        routes={loginuser}
        logoText={"home-expenses"}
        logo={logo}
        image={image}
        handleDrawerToggle={this.handleDrawerToggle}
        open={this.state.mobileOpen}
        color="blue"
        {...rest}
      />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );


  }
}
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default withStyles(dashboardStyle)(App);
export default connect(
  state => ({
    menu_left: state.menu_left
  }),
  dispatch => ({
    add_login:(value) => dispatch({type: 'SING_UP', payload: value})
  })
)(withStyles(dashboardStyle)(App));
