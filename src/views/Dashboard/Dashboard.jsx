import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from '@material-ui/core/Table';
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import LinearProgress from '@material-ui/core/LinearProgress';

import { bugs, website, server } from "variables/general";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "components/CustomButtons/Button.jsx";


import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from "axios";


let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


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
  },
  itpos: {
    position: "relative",
    top: "30px"
  },
  itpos2: {
    position: "relative",
    top: "10px"
  }
};

function validateValue(value) {
  var pattern  = /^([0-9]*[,])?[0-9]+$/;
  return pattern .test(value);
};


function validateDesc(desc) {
  var pattern  = /^[a-zA-Z0-9\s]+$/;
  return pattern .test(desc);
};

function isEmpty(str) {
    return (!str || 0 === str.length);
}

class Dashboard extends React.Component {
  constructor (props) {
  super(props)

  this.state = {
    open: false,
    open2: false,
    id_cat: '',
    id_cat2: '',
    title_cat: 'nones',
    pod_cats: [],
    expenses: [],
    ranges: [],
    selected_cat: ' ',
    status_find_pocat: 1,
    desc: '',
    p_cat: '',
    value: '',
    value_p: false,
    desc_p: false
  };
  }

  handleValueChange = e => {
    this.setState({value: e.target.value});
    if(validateValue(e.target.value)){
      this.setState({value_p: true});
      //console.log("value true", e.target.value);
    }else{
      //console.log("value false", e.target.value);
      this.setState({value_p: false});
    }
    };

  handleDescChange = e => {
      this.setState({desc: e.target.value});
      if(validateDesc(e.target.value)){
        this.setState({desc_p: true});
        //console.log("desc true", e.target.value);
      }else{
        //console.log("desc false", e.target.value);
        this.setState({desc_p: false});
      }
      };

  handleChange = prop => event => {

    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatselectetnotp")
    //   .then(res =>  this.otventa(res.data))
    //   .catch(err => console.log(err));
        this.setState({ open: false });
        this.setState({ open2: false });
        this.setState({ [prop]: event.target.value });
      this.setState({ selected_cat: event.target.value });

      console.log("Selected CAT now ", event.target.value);

      // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscataddp&selectedcatid="+event.target.value+"&catid="+this.props.options._id)
      //   .then(res =>  this.get_cats(res.data))
      //   .catch(err => console.log(err));
      //console.log("Selected CAT ", this.state.selected_cat);
    };

  getcat = () => {
    //console.log("send token ", sessionStorage.getItem("token"));
     //this.setState({status_u: "loading"});
       //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
       axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getexpensesselect_cats")
         .then(res => {
           if(res.data == ""){
            var cats_pod_not = [{
               value: 0,
               label: "Not category"
             }];
             this.setState({ pod_cats: cats_pod_not});
           }else{
             this.setState({ pod_cats: res.data});
           }

           //start = 1;
          //  this.props.update_cats_call();
           //this.otventa(res.data);


           //console.log("OK");
         })
         .catch(err => console.log(err));

  }

  getexpenses = () => {
    //console.log("send token ", sessionStorage.getItem("token"));
     //this.setState({status_u: "loading"});
       //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
       axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getexpenses")
         .then(res => {
           this.setState({ expenses: res.data});


           //start = 1;
          //  this.props.update_cats_call();
           //this.otventa(res.data);


           //console.log("OK");
         })
         .catch(err => console.log(err));

  }

  addexpense = () => {
   //console.log("EMail: " + this.state.email + "Password: " + this.state.password);
   if(!isEmpty(this.state.value) &&
     !isEmpty(this.state.desc) &&
     this.state.desc_p == true &&
     this.state.value_p == true
   ){
     axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=addexpense&namecat="+this.state.selected_cat+"&value="+this.state.value+"&desc="+this.state.desc)
       .then(res => {
         this.setState({ pod_cats: res.data});
         this.getcat();
         this.getexpenses();
         //start = 1;
        //  this.props.update_cats_call();
         //this.otventa(res.data);


         //console.log("OK");
       })
       .catch(err => console.log(err));
     console.log("Okey");


   }else{
     console.log("VALUE ", this.state.value);
     console.log("DESC ", this.state.desc);
   }
 }

  componentDidMount() {
    this.getcat();
    this.getexpenses();

      }
      componentDidUpdate() {
        //mode = (this.state.status_find_pocat == 0) ? this.Addponewcat(this.props._id) : this.Addponewcat2();



  }

  render() {

    const { classes } = this.props;
    return (


        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>New expenses</h4>
                <p className={classes.cardCategoryWhite}>Please enter new expenses data here</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={7} sm={7} md={2}>
                          <TextField
                            className={classes.itpos}
                              select
                              label="Category"

                              value={this.state.weightRange}
                              onChange={this.handleChange('weightRange')}
                              InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                              }}
                            >

                              {this.state.pod_cats.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>

                              </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                              <CustomInput
                                labelText="Description"
                                id="none"
                                name="desc"
                                error={this.state.email_p}
                                type="email"
                                onChange={this.handleDescChange}
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
                            <GridItem xs={12} sm={12} md={3}>



                              <TextField
                                id="full-width"
                                label="Value"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                placeholder="UAH"
                                onChange={this.handleValueChange}
                                className={classes.itpos2}
                                fullWidth
                                margin="normal"
                              />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={3}><Button color="primary" className={classes.itpos} onClick={() => this.addexpense()}>ADD EXPENSES</Button></GridItem>
                          </GridContainer>

              </CardBody>


            </Card>

          </GridItem>


          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Latest expenses</h4>
                <p className={classes.cardCategoryWhite}>Here is latest 20 expenses</p>
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
          {this.state.expenses.map(row => {
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







    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(Dashboard));
