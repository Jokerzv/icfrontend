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

import avatar from "assets/img/faces/marc.jpg";

import { injectGlobal } from "styled-components";
import axios from "axios";

import history from '../history/history';

import Cat from "../cat/cat";

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
    getcat: false,
    server: [],
    p_update: false
  };
}


  otventa = res => {

   this.setState({ server: res, getcat: true})
    this.props.update_cats_call();
   //console.log("Получил ",this.state.server);
 };


 addcat = e => {
   //console.log("send token ", sessionStorage.getItem("token"));
    //this.setState({status_u: "loading"});
      //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
      axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=add")
        .then(res => this.otventa(res.data))
        .catch(err => console.log(err));
  this.props.update_cats();
 }

 getcat = e => {
   //console.log("send token ", sessionStorage.getItem("token"));
    //this.setState({status_u: "loading"});
      //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
      axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
        .then(res => this.otventa(res.data))
        .catch(err => console.log(err));

 }


 // testing(take) {
 //     return this.props.select2(take);
 // }



    cat = (classes) => {
      return (

        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Categories</h4>
                  <p className={classes.cardCategoryWhite}>Please, confog yor categories</p>
                </CardHeader>
                <CardBody>
                <GridContainer>
              <div>
                {this.state.server.map(item => <Cat
          options={item}
          key={item._id}

        />)}
        </div>
                  </GridContainer>



                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={() => this.addcat()}>ADD CATEGORY</Button>

                </CardFooter>

              </Card>

            </GridItem>

          </GridContainer>
        </div>
      );

    }

  render(){

    //console.log("update ", this.props.cats.update);
    //this.getcat();
    if(this.props.cats[0].update == 1){
      //console.log("STATUS UPDATE ", this.props.cats[0].update);

      //this.setState({getcat: false});
      // console.log("STATUS UPDATE ", this.props.cats[0].update);
      // console.log("update start CAT");
      // this.();
      // console.log("update end CAT");
      // //this.props.update_cats();
       this.getcat();
       //this.setState({getcat: false});

      //this.setState({p_update: true});
      //console.log("OK");
    }

    // if(this.props.cats.update == 1){
    //     this.getcat();
    //   this.props.update_cats();
    //   this.props.update_cats_cal();
    // }
//this.props.add_login();
    if(this.state.getcat == false){
      this.getcat();
      this.setState({getcat: true});
      //this.props.update_cats();
      //this.props.update_cats_call();
    }
  //console.log("props: ", this.props.cats);
    //this.props.history.push('/signup');
  const { classes } = this.props;
//const texter = this.props.menu_left[0].pass;
  //const { name, pass, age } = this.props.user;
 //console.log(localStorage.getItem("email")+" "+localStorage.getItem("pass"));



//console.log("my ", this.props.menu_left);
 //const mode = (this.state.singup) ? this.rendEdit(contact, index) : this.rendNorm(contact, index);

 const mode = this.cat(classes);

  return (mode);
}
}



//export default withStyles(styles)(Auth);
export default connect(
  state => ({
    menu_left: state.menu_left,
    cats: state.cats
  }),
  dispatch => ({

    update_cats:(value) => dispatch({type: 'update_cats', payload: value}),
    update_cats_call:(value) => dispatch({type: 'update_cats_call', payload: value})
  })
)(withStyles(styles)(Auth));

//export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Auth));
