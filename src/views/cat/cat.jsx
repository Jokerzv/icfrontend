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


import axios from "axios";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Cat extends React.Component {

  state = {
      open: false,
      id_cat: '',
      title_cat:''
    };

    otventa = res => {

     //this.setState({ server: res, getcat: true})
     //   console.log("получил от странного сервера ", this.state.server);
     // if(this.state.server.status == "error_login"){
     //   this.setState({errors: 'Invalid email or password!'});
     //   //console.log("Ошибка получена ",this.state.server.status);
     // }else if(this.state.server.status == "wellcome"){
     //     // sessionStorage.setItem("token", this.state.server.token);
     //     // sessionStorage.setItem("email", this.state.server.email);
     //     // this.props.history.push('/dashboard');
     //   //console.log("не получил ошибку",this.state.server.status);
     // }else{
     //
     // }
     //this.setState({status_u: this.state.server.status});


     console.log("Получил ", res);
   };

   please_up = data => {
     axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcatup&catid="+data._id)
       .then(res =>  this.otventa(res.data))
       .catch(err => console.log(err));

       this.props.cat_up();
     //console.log(data._id);
     // this.setState({secret: e.target.value});
     };

  please_down = data => {
       axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdown&catid="+data._id)
         .then(res =>  this.otventa(res.data))
         .catch(err => console.log(err));

         this.props.cat_up();
       //console.log(data._id);
       // this.setState({secret: e.target.value});
       };

  please_delete = data => {
            axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdelete&catid="+data._id)
              .then(res =>  this.otventa(res.data))
              .catch(err => console.log(err));

              this.props.cat_up();
            //console.log(data._id);
            // this.setState({secret: e.target.value});
          };

  handleClickOpen = (id, title) => {
    this.setState({ open: true });

  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      const { classes } = this.props;
    let {options:{title, _id}} = this.props
    //console.log("Props    ", this.props.menu_left[0].pass);
    return (
      <div>
      <ListItem>
          <ListItemText primary={title} />
          <Button variant="contained" onClick={() => this.please_up({_id})}>
          <Icon color="primary">
            keyboard_arrow_up
          </Icon>

      </Button>

      <Button variant="contained" onClick={() => this.please_down({_id})}>
      <Icon color="primary">
        keyboard_arrow_down
      </Icon>

  </Button>
  <Button variant="contained" onClick={this.handleClickOpen({_id}, {title})}>
  <Icon color="primary">
    clear
  </Icon>

</Button>
<Button variant="contained">
<Icon color="primary">
  star_rate
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
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you seriously want to delete the ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
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
