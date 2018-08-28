import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { select2 } from "../../actions/index";

import LinearProgress from '@material-ui/core/LinearProgress';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import history from '../history/history';

import {withRouter} from 'react-router'

import avatar from "assets/img/faces/marc.jpg";

import { injectGlobal } from "styled-components";
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  root: {
    flexGrow: 1,
    width: "100%",
    height: "20px"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


function isEmpty(str) {
    return (!str || 0 === str.length);
}

//const LOCALSTORAGE_KEY = './users'
var er_t = false;
function validateEmail(email) {
  var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern .test(email);
};

function validatePass(pass) {
  var pattern  = /^[a-zA-Z0-9]+$/;
  return pattern .test(pass);
};



class SignUp extends React.Component {
  constructor (props) {
  super(props)

  this.state = {
    email: '',
    verif: '',
    secret: '',
    email_p: false,
    pass_p: false,
    repass_p: false,
    errors: '',
    password: '',
    repassword: '',
    status_u: "signup",
    server: {}
  };
}


//m = (okey == 1) ? this.props.history.push('/dashboard');

handleChange = e => this.setState({
  json: e.target.value
})

handleVerifChange = e => {
  this.setState({secret: e.target.value});
  };


handleEmailChange = e => {
  this.setState({email: e.target.value});
  if(!validateEmail(e.target.value)){
    this.setState({email_p: true});
    //console.log("email true", e.target.value);
  }else{
    //console.log("email false", e.target.value);
    this.setState({email_p: false});
  }
  };


  otventa = res => {
   this.setState({ server: res })
   if(this.state.server.status == "error_login"){
     this.setState({errors: 'Invalid email or password!'});
     //console.log("Ошибка получена ",this.state.server.status);
   }else if(this.state.server.status == "wellcome"){
       sessionStorage.setItem("token", this.state.server.token);
       sessionStorage.setItem("email", this.state.server.email);
       this.props.history.push('/dashboard');
     //console.log("не получил ошибку",this.state.server.status);
   }else{

   }
   this.setState({status_u: this.state.server.status});


   console.log("Получил ",this.state.server);
  };


handlePasswordChange = e => {
  this.setState({password: e.target.value});
  if(!validatePass(e.target.value)){
    this.setState({pass_p: true});
    //console.log("email true", e.target.value);
  }else{
    //console.log("email false", e.target.value);
    this.setState({pass_p: false});
  }
};
handleRepasswordChange = e => {
  this.setState({repassword: e.target.value});

  if(!validatePass(e.target.value)){
    this.setState({repass_p: true});
    //console.log("email true", e.target.value);
  }else{
    //console.log("email false", e.target.value);
    this.setState({repass_p: false});
  }
};

 handleLogin = e => {
  //console.log("EMail: " + this.state.email + "Password: " + this.state.password);


  if(!isEmpty(this.state.email) &&
    !isEmpty(this.state.password) &&
    !isEmpty(this.state.repassword) &&
  this.state.password == this.state.repassword){
      //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
      this.setState({status_u: "loading"});

      axios.get("http://127.0.0.1:4000/users?email="+this.state.email+"&pass="+this.state.password+"&status=signup")
        .then(res => this.otventa(res.data))
        .catch(err => console.log(err));

      //componentDidMount() {
        //axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
        //   .then(({ data }) => {
        //     this.setState({
        //       products: data
        // });


      //});
      //  .then(response => response.data)
      //  .then(this.setState({products: data}))
      //  .catch(error => console.error(error));
      // }

      // setTimeout(
      //   function() {
      //       console.log("Status1 ",this.state.server.status);
      //     this.setState({status_u: this.state.server.status, secret: this.state.server.secret});
      //
      //     if(this.state.server.status == "cancel_email"){
      //       this.setState({errors: 'Error! Email already registered in the system!'});
      //       //console.log("Ошибка получена ",this.state.server.status);
      //     }else if(this.state.server.status == "wellcome"){
      //         sessionStorage.setItem("token", this.state.server.token);
      //         console.log("Save token ", this.state.server.token);
      //         console.log("Token ", sessionStorage.getItem("token"));
      //       //console.log("не получил ошибку",this.state.server.status);
      //     }else{
      //
      //     }
      //
      //
      //
      //     console.log("Получил ",this.state.server);
      //     console.log("Status ",this.state.server.status);
      //   }
      //   .bind(this),
      //   1000
      // );
      //window.localStorage.setItem("email", this.state.email);
      //window.localStorage.setItem("pass", this.state.password);
      //console.log(localStorage.getItem("email")+" "+localStorage.getItem("pass"));

  }else if(!isEmpty(this.state.email) &&
    !isEmpty(this.state.password) &&
    !isEmpty(this.state.repassword) &&
  this.state.password != this.state.repassword){
    this.setState({errors: 'Passwords do not match'});
      console.log("Sing up error password");
  }else{
    console.log("Sing up error");
  }
}

// Verif
handleVerif = e => {
 //console.log("EMail: " + this.state.email + "Password: " + this.state.password);





 if(!isEmpty(this.state.secret)){
     //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
     this.setState({status_u: "loading"});
     axios.get("http://127.0.0.1:4000/users?email="+this.state.email+"&secret="+this.state.secret+"&status=verif")
       .then(res => this.otventa(res.data))
       .catch(err => console.log(err));

     //componentDidMount() {
       //axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
       //   .then(({ data }) => {
       //     this.setState({
       //       products: data
       // });


     //});
     //  .then(response => response.data)
     //  .then(this.setState({products: data}))
     //  .catch(error => console.error(error));
     // }

     // setTimeout(
     //   function() {
     //       console.log("Status1 ",this.state.server.status);
     //     this.setState({status_u: this.state.server.status, secret: this.state.server.secret});
     //
     //     if(this.state.server.status == "cancel_email"){
     //       this.setState({errors: 'Error! Email already registered in the system!'});
     //       //console.log("Ошибка получена ",this.state.server.status);
     //     }else if(this.state.server.status == "wellcome"){
     //         sessionStorage.setItem("token", this.state.server.token);
     //         console.log("Save token ", this.state.server.token);
     //         console.log("Token ", sessionStorage.getItem("token"));
     //       //console.log("не получил ошибку",this.state.server.status);
     //     }else{
     //
     //     }
     //
     //
     //
     //     console.log("Получил ",this.state.server);
     //     console.log("Status ",this.state.server.status);
     //   }
     //   .bind(this),
     //   1000
     // );
     //window.localStorage.setItem("email", this.state.email);
     //window.localStorage.setItem("pass", this.state.password);
     //console.log(localStorage.getItem("email")+" "+localStorage.getItem("pass"));

 }else{
   console.log("Sing up error");
 }
}


 testing(take) {
     return this.props.select2(take);
 }
    //console.log("Password: " + this.state.password);
    verif = (classes) => {
        return(
          <div>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Email verification to finish registration with Home Expense App</h4>
                    <p className={classes.cardCategoryWhite}>Please confirm secret code</p>
                  </CardHeader>
                  <CardBody>
                  {this.state.errors}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        Your secret code: {this.state.server.secret}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>

                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Secret Code"
                          id="none"
                          name="code"

                          type="text"
                          onChange={this.handleVerifChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          /*
                          inputProps={{
                            disabled: true
                          }}
                          */
                        />
                      </GridItem>

                    </GridContainer>



                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={() => this.handleVerif()}>Verif</Button>

                  </CardFooter>

                </Card>

              </GridItem>

            </GridContainer>
          </div>
        );

    }
    sign_up = (classes) => {
      return(
        <div>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Register with Home Expense App</h4>
                  <p className={classes.cardCategoryWhite}>Please, enter your email and password</p>
                </CardHeader>
                <CardBody>
                  {this.state.errors}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Email"
                        id="none"
                        name="email"
                        required
                        error={this.state.email_p}
                        type="email"
                        onChange={this.handleEmailChange}
                        formControlProps={{
                          fullWidth: true
                        }}

                        inputProps={{
                          disabled: false
                        }}

                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Password"
                        id="none"
                        name="password"
                        error={this.state.pass_p}
                        onChange={this.handlePasswordChange}
                        type="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Re-password"
                        id="none"
                        name="repassword"
                        error={this.state.repass_p}
                        onChange={this.handleRepasswordChange}
                        type="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>



                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={() => this.handleLogin()}>Sing Up</Button>

                </CardFooter>

              </Card>

            </GridItem>

          </GridContainer>
        </div>
      );
    }
    loading = (classes) => {
      return(
        <div>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Plaese waiting...</h4>
                  <p className={classes.cardCategoryWhite}>Registration</p>
                </CardHeader>
                <CardBody>

                      <div className={classes.root}>

                            <LinearProgress />
                              <br />
                          </div>




                </CardBody>


              </Card>

            </GridItem>

          </GridContainer>
        </div>
      );
    }
    wellcome = (classes) => {
      return(
        <div>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Plaese waiting...</h4>
                  <p className={classes.cardCategoryWhite}>Redirect</p>
                </CardHeader>
                <CardBody>

                      <div className={classes.root}>

                            <LinearProgress />
                              <br />
                          </div>




                </CardBody>


              </Card>

            </GridItem>

          </GridContainer>
        </div>
      );
    }
  render(){

  const { classes } = this.props;
  const mode = (this.state.status_u == "signup") ? this.sign_up(classes) :
               (this.state.status_u == "loading") ? this.loading(classes) :
               (this.state.status_u == "verif") ? this.verif(classes) :
               (this.state.status_u == "error_secret") ? this.verif(classes) :
               (this.state.status_u == "wellcome") ? this.wellcome(classes) :
               this.sign_up(classes);

  //const { name, pass, age } = this.props.user;
 //console.log(localStorage.getItem("email")+" "+localStorage.getItem("pass"));
  return (mode);
}
}

function mapStateToProps(state) {
  return {
    clients: state.clients_connect_json
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ select2: select2 }, dispatch);
}



//export default withStyles(styles)(Auth);
export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(SignUp));
