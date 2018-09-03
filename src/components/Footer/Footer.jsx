import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle";

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      auth: false
    };

  }

//function Footer({ ...props }) {
render(){
  const { classes } = this.props;
  if(this.props.auth[0].auth == 0){
    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="/signin" className={classes.block}>
                  Sign In
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="/signup" className={classes.block}>
                  Sign Up
                </a>
              </ListItem>

            </List>
          </div>
          <p className={classes.right}>
            <span>
              &copy; {1900 + new Date().getYear()}{" "}
              <a href="#" className={classes.a}>
                Special for InCode (Jokerzv)
              </a>, made with love for a better web
            </span>
          </p>
        </div>
      </footer>
    );
  }else{
    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="/dashboard" className={classes.block}>
                  Dashboard
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="/reports" className={classes.block}>
                  Reports
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="/config" className={classes.block}>
                  Config
                </a>
              </ListItem>
            </List>
          </div>
          <p className={classes.right}>
            <span>
              &copy; {1900 + new Date().getYear()}{" "}
              <a href="#" className={classes.a}>
                Special for InCode (Jokerzv)
              </a>, made with love for a better web
            </span>
          </p>
        </div>
      </footer>
    );
  }

}
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default withStyles(footerStyle)(Footer);

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    //add_login:(value) => dispatch({type: 'SING_UP', payload: value}),
    auth_send:(value) => dispatch({type: 'auth_false', payload: value})
  })
)(withStyles(footerStyle)(Footer));
