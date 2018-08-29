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

import axios from "axios";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Cat extends React.Component {

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

     //console.log(data._id);
     // this.setState({secret: e.target.value});
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

      <Button variant="contained" onClick={() => this.props.cat_up({_id})}>
      <Icon color="primary">
        keyboard_arrow_down
      </Icon>

  </Button>
  <Button variant="contained">
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
        </div>
    );
  }

}

  Cat.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default connect(
    state => ({
      menu_left: state.menu_left
    }),
    dispatch => ({
      cat_up:(value) => dispatch({type: 'cat_up', payload: value}),
      add_login:(value) => dispatch({type: 'OK', payload: value})
    })
  )(withStyles(styles)(Cat));
