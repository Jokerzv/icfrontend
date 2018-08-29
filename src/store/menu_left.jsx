import React from "react";
import PropTypes from 'prop-types';
//import Cat from '../views/cat/cat';
import axios from "axios";

var initialState = [];

function otventa (res) {
  //initialState = res;
 console.log("Получил redux cat+UP", res);
};



// const initialState = [
//   {
//     menu_left:'0',
//     pass: 'false'
//   }
// ];

export default function menu_left(state=initialState, action){
  if (action.type === "cat_up"){

      // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcatup&catid="+action.payload._id)
      //   .then(res =>  otventa(res.data))
      //   .catch(err => console.log(err));

      //console.log(data._id);
      // this.setState({secret: e.target.value});


    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
    //   .then(res => {state = res.data; console.log("получены данные ", initialState);})
    //   .catch(err => console.log(err));
      state = [{name: 123}];
      console.log("state ", state);
    return state;
  }else if(action.type === "OK"){
    axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
      .then(res => {state = res.data; console.log("Получил first ", res.data);})
      .catch(err => console.log(err));

    return state;
  }

  // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcatup&catid=")
  //   .then(res =>  state = res.data)
  //   .catch(err => console.log(err));

  return state;
}
