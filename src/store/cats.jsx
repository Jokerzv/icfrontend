import React from "react";
import PropTypes from 'prop-types';
//import Cat from '../views/cat/cat';
import axios from "axios";


var cats = [{update: 0}];

// console.log("four ", cats);
//
// axios.get("http://127.0.0.1:4000/cat?token="+sessionStorage.getItem("token")+"&status=getcat")
//   .then(res => {cats = res.data; console.log("Получил first ", cats);})
//   .catch(err => console.log(err));


console.log("new ",cats);
export default function menu_left(state=cats, action){
  if (action.type === "update_cats"){
    cats = [{update: 1}];
    console.log("updating...", cats);
      return cats;
  }else if (action.type === "update_cats_call"){
    cats = [{update: 0}];
    console.log("updating...", cats);
      return cats;
  }

  return cats;
};
