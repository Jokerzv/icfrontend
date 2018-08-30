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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function Transition2(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Cat extends React.Component {

  constructor (props) {
  super(props)

  this.state = {
    open: false,
    open2: false,
    id_cat: '',
    title_cat: 'nones',
    pod_cats: []
  };
  }



  handleClickOpen = data => {
    //console.log("ID ", data._id, "TITLE ", data.title);
    this.setState({ open: true, id_cat: data._id, title_cat: data.title,});
      //console.log(data);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    otventa = res => {
      this.setState({ pod_cats: res });

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
    console.log("S ", this.state.title_cat);
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
  <Button variant="contained" onClick={() => this.handleClickOpen({_id, title})}>
  <Icon color="primary">
    clear
  </Icon>

</Button>
<Button variant="contained" onClick={() => this.handleClickOpen_pod({_id, title})}>
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




        <Dialog
          open={this.state.open2}
          TransitionComponent={Transition2}
          keepMounted
          onClose={this.handleClose2}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <div>
              {this.state.pod_cats.map(item => <Cat
        options={item}
        key={item._id}
      />)}
      </div>

              You seriously want to delete the {this.state.pod_cats}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose2} color="primary">
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
