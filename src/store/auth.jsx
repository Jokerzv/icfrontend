import React from "react";
import PropTypes from 'prop-types';
//import Cat from '../views/cat/cat';
import axios from "axios";


var user = [{auth: 0}];

// console.log("four ", cats);
//
// axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
//   .then(res => {cats = res.data; console.log("Получил first ", cats);})
//   .catch(err => console.log(err));

function isEmpty(str) {
    return (!str || 0 === str.length);
}

//console.log("new ",cats);
export default function auth_send(state=user, action){
  if (action.type === "auth_true"){
    if(!isEmpty(sessionStorage.getItem("token")) || sessionStorage.getItem("token") != null){
      state = [{auth: 1}];
  }else{
    state = [{auth: 0}];
  }
    //console.log("updating...", cats);
      return state;
  }else if (action.type === "auth_false"){
    state = [{auth: 0}];
    //console.log("updating...", cats);
      return state;
  }

  if(!isEmpty(sessionStorage.getItem("token")) || sessionStorage.getItem("token") != null){
    state = [{auth: 1}];
  }else{
  state = [{auth: 0}];
  }
  return state;
};
