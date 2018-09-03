import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// core components

import { connect } from 'react-redux'

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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import avatar from "assets/img/faces/marc.jpg";

import { injectGlobal } from "styled-components";
import axios from "axios";

import history from '../history/history';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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

const SAMPLE_JSON = {
"id": 0,
"email": '',
"password": '',
"verify": 0
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function validateEmail(email) {
  var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern .test(email);
};

function validatePass(pass) {
  var pattern  = /^[a-zA-Z0-9]+$/;
  return pattern .test(pass);
};


// function userss(state = [], action) {
//   if (action.type === 'SING_UP') {
//     return [
//       ...state,
//       action.payload
//     ];
//   }
// return state;
// }




//const LOCALSTORAGE_KEY = './users'

class Auth extends React.Component {
  constructor (props) {
  super(props)

  this.state = {
    email: '',
    password: '',
    errors: '',
    email_p: false,
    pass_p: false,
    status_u: "signup",
    server: {},
    reports: []
  };
}


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

  handleLogin = e => {
   //console.log("EMail: " + this.state.email + "Password: " + this.state.password);



   if(!isEmpty(this.state.email) &&
     !isEmpty(this.state.password)){
       this.setState({status_u: "loading"});
       //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
       axios.get("http://127.0.0.1:4000/users?email="+this.state.email+"&pass="+this.state.password+"&status=login")
         .then(res =>  this.otventa(res.data))
         .catch(err => console.log(err));


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

 handleVerif = e => {
  //console.log("EMail: " + this.state.email + "Password: " + this.state.password);


  if(!isEmpty(this.state.secret)){
    this.setState({status_u: "loading"});
      //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
      axios.get("http://127.0.0.1:4000/users?email="+this.state.email+"&secret="+this.state.secret+"&status=verif")
        .then(res => this.otventa(res.data))
        .catch(err => console.log(err));


  }else{
    console.log("Sing up error");
  }
 }
 // testing(take) {
 //     return this.props.select2(take);
 // }
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
    signin = (classes) => {
      return (

        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Expenses reports</h4>
                  <p className={classes.cardCategoryWhite}>Here is some expense reports</p>
                </CardHeader>
                <CardBody>


        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell color="primary">Date</TableCell>
              <TableCell numeric>Category</TableCell>
              <TableCell numeric>Expenses</TableCell>
              <TableCell numeric>Value, UAH</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.reports.map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">

        {row.date_t}

                  </TableCell>
                  <TableCell numeric>{row.namecat}</TableCell>
                  <TableCell numeric>{row.desc}</TableCell>
                  <TableCell numeric>{row.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

                </CardBody>


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
                  <p className={classes.cardCategoryWhite}>Sign in</p>
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


      getexpenses = () => {
        //console.log("send token ", sessionStorage.getItem("token"));
         //this.setState({status_u: "loading"});
           //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
           axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getexpenses")
             .then(res => {
               this.setState({ reports: res.data});


               //start = 1;
              //  this.props.update_cats_call();
               //this.otventa(res.data);


               //console.log("OK");
             })
             .catch(err => console.log(err));

      }

    componentDidMount() {

      this.getexpenses();

        }
  render(){
    //this.props.history.push('/signup');
  const { classes } = this.props;
//const texter = this.props.menu_left[0].pass;
  //const { name, pass, age } = this.props.user;
 //console.log(localStorage.getItem("email")+" "+localStorage.getItem("pass"));



//console.log("my ", this.props.menu_left);
 //const mode = (this.state.singup) ? this.rendEdit(contact, index) : this.rendNorm(contact, index);

 const mode = (this.state.status_u == "signin") ? this.signin(classes) :
              (this.state.status_u == "loading") ? this.loading(classes) :
              (this.state.status_u == "verif") ? this.verif(classes) :
              this.signin(classes);

  return (mode);
}
}



//export default withStyles(styles)(Auth);
export default connect(
  state => ({
    menu_left: state.menu_left
  }),
  dispatch => ({
    add_login:(value) => dispatch({type: 'OK', payload: value})
  })
)(withStyles(styles)(Auth));

//export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Auth));
