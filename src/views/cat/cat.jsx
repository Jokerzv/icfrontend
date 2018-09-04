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

import Podcat from "./podcat";

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

var update = 0;
var id = 0;
var mode = "123";





class Cat extends React.Component {

  constructor (props) {
  super(props)

  this.state = {
    open: false,
    open2: false,
    id_cat: '',
    id_cat2: '',
    title_cat: 'nones',
    pod_cats: [],
    cats_now: [],
    ranges: [],
    selected_cat: '',
    status_find_pocat: 1
  };
  }

  // otvet_rages = (res, ids) => {
  //
  //   //this.setState({ ranges: res });
  //
  //  //console.log("Получил rages ", res);
  //
  // //console.log("YO ID ",  ids);
  //
  //  //console.log(new_massive);
  //
  // };

  listcats = data => {

    //console.log("no ID LA", data);
    //if(data =! "" || data != true){
    axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatselectetnotp&catid="+data)
      .then(res =>  {
        //this.otvet_rages(res.data, data);
        //console.log("SSSS ", data);
        const new_massive =  res.data.filter((user) => {return user.value != data;});
        this.setState({ ranges: new_massive });

      })
      .catch(err => console.log(err));
//}





      //this.setState({ [prop]: event.target.value });
    };

  handleChange = prop => event => {

    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatselectetnotp")
    //   .then(res =>  this.otventa(res.data))
    //   .catch(err => console.log(err));
        this.setState({ open: false });
        this.setState({ open2: false });
        this.setState({ [prop]: event.target.value });
      this.setState({ selected_cat: event.target.value });

      console.log("Selected CAT now ", event.target.value, "CAT ID ", this.props.options._id);

      axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscataddp&selectedcatid="+event.target.value+"&catid="+this.props.options._id)
        .then(res =>  this.get_cats(res.data))
        .catch(err => console.log(err));
      //console.log("Selected CAT ", this.state.selected_cat);
    };
// handleClickAddPodCat = data => {
//   axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscataddp&selectedcatid="+this.state.selected_cat+"&catid="+data._id)
//     .then(res =>  this.get_cats(res.data))
//     .catch(err => console.log(err));
// };
  handleClickOpen = data => {
    //console.log("ID ", data._id, "TITLE ", data.title);
    this.setState({ open: true, id_cat: data._id, title_cat: data.title,});
      //console.log(data);



  };



   get_cats = res => {
     this.setState({ cats_now: res });
     this.props.cat_up();
     //var tyn = Object.keys(this.state.cats_now).length;
     //var tyn = this.state.cats_now._id.length;
     //alert(tyn);
    //console.log("Получил get_cats: ", res);
  };

   please_up = data => {
     axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcatup&catid="+data._id)
       .then(res =>  this.get_cats(res.data))
       .catch(err => console.log(err));

       this.props.cat_up();
     //console.log(data._id);
     // this.setState({secret: e.target.value});
     };

  please_down = data => {
       axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdown&catid="+data._id)
         .then(res =>  this.get_cats(res.data))
         .catch(err => console.log(err));

         this.props.cat_up();
       //console.log(data._id);
       // this.setState({secret: e.target.value});
       };

  please_delete = data => {
            axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatdelete&catid="+this.state.id_cat)
              .then(res =>  {
                //this.otventa(res.data);

                this.setState({ pod_cats: res.data });

               //console.log("Получил подкатегорияы", res);

               if(res.data == ""){
                 this.setState({status_find_pocat: 0});
                 console.log("PUSTO");
               }
               this.listcats(this.props.options._id);

              })
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

 //  otventa = res => {
 //    this.setState({ pod_cats: res });
 //
 //   //console.log("Получил подкатегорияы", res);
 //
 //   if(res == ""){
 //     this.setState({status_find_pocat: 0});
 //     console.log("PUSTO");
 //   }
 //   this.listcats(this.props.options._id);
 // };

  handleClickOpen_pod = data => {

    axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getscatpod&catidselected="+data._id)
      .then(res =>  {
        //this.otventa(res.data);

        this.setState({ pod_cats: res.data });

       //console.log("Получил подкатегорияы", res);

       if(res.data == ""){
         this.setState({status_find_pocat: 0});
         //console.log("PUSTO");
       }
       this.listcats(this.props.options._id);

      })
      .catch(err => console.log(err));

        this.setState({ open2: true });
        //console.log("opened list");
  };


  getcat = e => {
    //console.log("send token ", sessionStorage.getItem("token"));
     //this.setState({status_u: "loading"});
       //  axios.get("http://http://127.0.0.1:4000/users?email="+this.state.email+"&p="+this.state.password)
       axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
         .then(res => this.get_cats(res.data))
         .catch(err => console.log(err));

  }


  Addponewcat = (id) => {
    return(
      <div>
      <TextField
          select
          label="Add categories"

          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Categories</InputAdornment>,
          }}
        >

          {this.state.ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        </div>
    );
  }

  Addponewcat2 = () => {

    return;
  }

  componentDidMount() {


    //id = this.props.options._id;
    this.listcats(this.props.options._id);
    //console.log("POPESDSD ", this.props);

      }
      componentDidUpdate() {
        if(this.props.cats[0].update == 1){
          this.listcats(this.props.options._id);
        }
        if(this.props.pod2[0].podwindow == 1){
        this.setState({ open2: false });
        this.props.podcat_p();
        }
        mode = (this.state.status_find_pocat == 0) ? this.Addponewcat(this.props._id) : this.Addponewcat2();



  }

  render() {

    const { classes } = this.props;
    let {options:{title, _id}} = this.props;


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
            {"List subcategory"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">

            {mode}


              {this.state.pod_cats.map(item => <Podcat
        options={item}
        key={item._id}
      />)}




            </DialogContentText>
          </DialogContent>

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
      cats: state.cats,
      pod2: state.podcat_p
    }),
    dispatch => ({
      cat_up:(value) => dispatch({type: 'update_cats', payload: value}),
      podcat_p:(value) => dispatch({type: 'podwindow_true', payload: value}),
      add_login:(value) => dispatch({type: 'OK', payload: value})
    })
  )(withStyles(styles)(Cat));
