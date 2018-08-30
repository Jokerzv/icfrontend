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
  if (action.type === "update_cats_2"){

    axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
      .then(res => {state = res.data; console.log("Получил up_2 ", res.data);})
      .catch(err => console.log(err));

      //console.log(data._id);
      // this.setState({secret: e.target.value});


    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
    //   .then(res => {state = res.data; console.log("получены данные ", initialState);})
    //   .catch(err => console.log(err));
    state = [{title: 321}];
    return state;
  }else if(action.type === "OK"){
    // axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
    //   .then(res => {state = res.data; console.log("Получил first ", res.data);})
    //   .catch(err => console.log(err));

    return state;
  }

  // console.log("one ",state);
  state = [{title: 123}];
      return state;

}
