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

import Rep_pod from './rep_pod';

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
    reports: [],
    rep_pod: []
  };
}





    signin = (classes, tesing) => {
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

              <TableCell numeric>Category</TableCell>

              <TableCell numeric>Value, UAH</TableCell>

            </TableRow>
          </TableHead>

          {this.state.reports.map(row => {

            if(row.p_cat_is == 0){
              // var test = (<TableRow key={row._id}>
              //   <TableCell component="th" scope="row">  {row.date_t}</TableCell>
              //   <TableCell numeric>{row.namecat}</TableCell>
              //   <TableCell numeric>{row.desc}</TableCell>
              //   <TableCell numeric>{row.value}</TableCell>
              // </TableRow>);
              return (  <TableBody>
                <TableRow key={row._id}>

                  <TableCell numeric>{row.title}</TableCell>

                  <TableCell numeric>{row.value}</TableCell>
                </TableRow>
              </TableBody>
              )
            }else if(row.p_cat_is == 1){

              // return (
              //   <TableRow key={row._id}>
              //
              //     <TableCell numeric>--- {row.title}</TableCell>
              //
              //     <TableCell numeric>{row.value}</TableCell>
              //   </TableRow>
              // )

              if(this.state.rep_pod == ""){
              axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getexpenses_pod&ex_id="+row._id)
                .then(res => {
                  //this.setState({ reports: res.data});
                  this.setState({rep_pod: res.data})
                  console.log(res.data);


                  //start = 1;
                 //  this.props.update_cats_call();
                  //this.otventa(res.data);


                  //console.log("OK");
                })
                .catch(err => console.log(err));

                }
                 var catogo = <TableRow key={row._id}>

                    <TableCell numeric>--- {row.title}</TableCell>

                    <TableCell numeric>{row.value}</TableCell>
                  </TableRow>;

                  // cat_po = () =>{
                    // this.state.rep_pod.map(item => {
                    //   return(
                    //     <TableRow key={item._id}>
                    //
                    //       <TableCell numeric>--- {item.title}</TableCell>
                    //
                    //       <TableCell numeric>{item.value}</TableCell>
                    //     </TableRow>
                    //   )
                    // })
                  // };
                  var sum2 = 0;
                  {this.state.rep_pod.map(item => {
                    sum2 += item.value;

                  })}

                  var sum = row.value + sum2;
                return (
                    <TableBody>
                  <TableRow key={row._id}>

                     <TableCell numeric> {row.title}</TableCell>

                     <TableCell numeric>{row.value} (Всего: {sum})</TableCell>

                     </TableRow>

                   {this.state.rep_pod.map(item => {

                     return(
                       <TableRow key={item._id}>

                         <TableCell numeric>--- {item.title}</TableCell>

                         <TableCell numeric>{item.value}</TableCell>
                       </TableRow>
                     )
                   })}
                 </TableBody>
                )



              //   var test3 = "<TableCell numeric>{row.value}</TableCell>";
              // var test = (<TableRow key={row._id}>
              //   <TableCell component="th" scope="row">  {row.date_t}</TableCell>
              //   <TableCell numeric>{row.namecat}</TableCell>
              //   <TableCell numeric>{row.desc}</TableCell>
              //   <TableCell numeric>{row.value}</TableCell>
              //     <TableCell numeric> {test3}</TableCell>
              // </TableRow>);





            }


          })}

        </Table>

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
           axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatall")
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
