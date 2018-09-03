import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
//import history from '../../views/history/history';

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";


var t = 0;

function isEmpty(str) {
    return (!str || 0 === str.length);
}
var mode = "loading...";
class HeaderLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      auth: false
    };

  }



//   test () {
//     if(t == 0){
//      setTimeout(() => {
//
//      //console.log("up test");
//
//
//
//
// this.test();
//
//    }, 1000);
//  }
//
//  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleSignin = () =>{

    window.location.replace("/signin");
  }

  handleSignup = () =>{
    window.location.replace("/signup");
  }

handleLogout = () =>{
  console.log("my token: ", sessionStorage.getItem("token"));
  //sessionStorage.removeItem("token");
  sessionStorage.clear();
  console.log("my token: ", sessionStorage.getItem("token"));
  this.props.auth_send();
  //this.props.history.push('/');
  window.location.replace("/");
}


componentDidMount() {




    }

    Authfalse = (classes, open) => {
      return(
        <div>

          <div className={classes.manager}>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              <Person className={classes.icons} />

              <Hidden mdUp implementation="css">
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </Button>
            <Poppers
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !open }) +
                " " +
                classes.pooperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={this.handleSignin}
                          className={classes.dropdownItem}
                        >
                          Sign in
                        </MenuItem>
                        <MenuItem
                          onClick={this.handleSignup}
                          className={classes.dropdownItem}
                        >
                          Sign up
                        </MenuItem>

                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>

        </div>
      );
    }

    Authtrue = (classes, open) => {
      return(
        <div>

          <div className={classes.manager}> {sessionStorage.getItem("email")}!
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              <Person className={classes.icons} />

              <Hidden mdUp implementation="css">
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </Button>
            <Poppers
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !open }) +
                " " +
                classes.pooperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={this.handleLogout}
                          className={classes.dropdownItem}
                        >
                          Sign out
                        </MenuItem>

                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>

        </div>
      );
    }
    componentDidUpdate() {
      //console.log("up");

      const { classes } = this.props;
      const { open } = this.state;

      if(!isEmpty(sessionStorage.getItem("token")) && sessionStorage.getItem("token") != "undefined"){
        mode =  this.Authtrue(classes, open);

      }else if(sessionStorage.getItem("token") == "undefined"){
        sessionStorage.clear();
        //window.location.replace("/");
      }else{
           mode =  this.Authfalse(classes, open);
      }
      //console.log("update forever");
      //mode = (this.state.auth == false) ? this.Authfalse(classes, open) : this.Authtrue(classes, open);
}

  render() {

//console.log(this.props);
    if(this.props.auth[0].auth == 0){
      const { classes } = this.props;
      const { open } = this.state;
  return(
    <div>

      <div className={classes.manager}>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />

          <Hidden mdUp implementation="css">
            <p onClick={this.handleClick} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleSignin}
                      className={classes.dropdownItem}
                    >
                      Sign in
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleSignup}
                      className={classes.dropdownItem}
                    >
                      Sign up
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>

    </div>
  );

  }else{
    const { classes } = this.props;
    const { open } = this.state;
    return(
      <div>

        <div className={classes.manager}> {sessionStorage.getItem("email")}!
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />

            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleLogout}
                        className={classes.dropdownItem}
                      >
                        Sign out
                      </MenuItem>

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>

      </div>
    );
  }
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    //add_login:(value) => dispatch({type: 'SING_UP', payload: value}),
    auth_send:(value) => dispatch({type: 'auth_false', payload: value})
  })
)(withStyles(headerLinksStyle)(HeaderLinks));

//export default withStyles(headerLinksStyle)(HeaderLinks);
