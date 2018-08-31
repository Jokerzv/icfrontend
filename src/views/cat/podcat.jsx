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

import axios from "axios";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function Transition2(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


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

class Cat extends React.Component {

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

     console.log("Получил rages ", res);
   };


  please_delete = data => {
            axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdelete&catid="+this.state.id_cat)
              .then(res =>  this.otventa(res.data))
              .catch(err => console.log(err));
                this.setState({ open: false });
              this.props.cat_up();
            //console.log(data._id);
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

  render() {
    // if(this.state.update_podcat == false){
    //   this.listcats();
    //   this.setState({update_podcat: true});
    // }
    //console.log("S ", this.state.title_cat);
      const { classes } = this.props;
    let {options:{title, _id}} = this.props
    //console.log("Props    ", this.props.menu_left[0].pass);



    return (
      <div>

      <ListItem>
          <ListItemText primary={title} />



  <Button variant="contained" onClick={() => this.handleClickOpen({_id, title})}>
  <Icon color="primary">
    clear
  </Icon>

</Button>

        </ListItem>


        <Divider />

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You seriously want to delete the {this.state.title_cat}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={() => this.please_delete()} color="primary">
              Yea!
            </Button>
          </DialogActions>
        </Dialog>


        </div>
    );
  }

}

  Cat.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default connect(
    state => ({
      menu_left: state.menu_left,
      cats: state.cats
    }),
    dispatch => ({
      cat_up:(value) => dispatch({type: 'update_cats', payload: value}),
      add_login:(value) => dispatch({type: 'OK', payload: value})
    })
  )(withStyles(styles)(Cat));
