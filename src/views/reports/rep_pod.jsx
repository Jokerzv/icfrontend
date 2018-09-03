import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Assignment from "@material-ui/icons/Assignment";
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function Transition2(props) {
  return <Slide direction="up" {...props} />;
}

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



var ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];



class Podcat extends React.Component {

  constructor (props) {
  super(props)

  this.state = {
    open: false,
    open2: false,
    update_podcat: false,
    id_cat: '',
    title_cat: 'nones',
    pod_cats: [],
    ranges: [],
    selected_cat: ''
  };
  }

  // listcats = () => {
  //
  //   axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatselectetnotp")
  //     .then(res =>  this.otventa(res.data))
  //     .catch(err => console.log(err));
  //
  //
  //     //this.setState({ [prop]: event.target.value });
  //   };

  handleChange = prop => event => {

    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatselectetnotp")
    //   .then(res =>  this.otventa(res.data))
    //   .catch(err => console.log(err));
        this.setState({ open: false });
this.setState({ [prop]: event.target.value });
      this.setState({ selected_cat: event.target.value });
      //console.log("Selected CAT now ", event.target.value);
      //console.log("Selected CAT ", this.state.selected_cat);
    };


  handleClickOpen = data => {
    //console.log("ID ", data._id, "TITLE ", data.title);
    this.setState({ open: true, id_cat: data._id, title_cat: data.title,});
      //console.log(data);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    otventa = res => {
      this.setState({ ranges: res });

     //console.log("Получил rages ", res);
   };


  please_delete = data => {
            axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdeletePod&catid="+data._id)
              .then(res =>  this.otventa(res.data))
              .catch(err => console.log(err));

                this.setState({ open: false });
                this.setState({ open2: false });
              this.props.cat_up();
            //console.log("DELETE CAT ", this.state.id_cat);
            this.props.podcat_p();
            // this.setState({secret: e.target.value});
          };


  handleClose = () => {
    this.setState({ open: false });
  };
  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleClickClose_pod = () => {
    this.setState({ open2: false });
  };

  handleClickOpen_pod = data => {

    axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatpod&catid="+this.state.id_cat)
      .then(res =>  this.otventa(res.data))
      .catch(err => console.log(err));
        this.setState({ open2: true });
  };

  // componentDidMount() {
  //
  //     }
  //     componentDidUpdate() {
  //
  // }

  render() {
    const { classes } = this.props;
    let {options:{namecat, _id, desc, value, date_t}} = this.props;
    return (
      <TableRow key={_id}>
        <TableCell component="th" scope="row"> 123{date_t}</TableCell>
        <TableCell numeric>{namecat}</TableCell>
        <TableCell numeric>{desc}</TableCell>
        <TableCell numeric>{value}</TableCell>
      </TableRow>

    );
  }

}

  Podcat.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default connect(
    state => ({
      menu_left: state.menu_left,
      cats: state.cats
    }),
    dispatch => ({
      cat_up:(value) => dispatch({type: 'update_cats', payload: value}),
      podcat_p:(value) => dispatch({type: 'podwindow_false', payload: value}),
      add_login:(value) => dispatch({type: 'OK', payload: value})
    })
  )(withStyles(styles)(Podcat));
