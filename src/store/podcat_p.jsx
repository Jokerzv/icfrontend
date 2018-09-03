import React from "react";
import PropTypes from 'prop-types';

var pod2 = [{podwindow: 0}];

//console.log("new ",cats);
export default function podcat_p(state=pod2, action){
  if (action.type === "podwindow_false"){

    state = [{podwindow: 1}];

    //console.log("updating...", cats);
      return state;
  }else if (action.type === "podwindow_true"){
    state = [{podwindow: 0}];
    //console.log("updating...", cats);
      return state;
  }

  state = [{podwindow: 0}];
  return state;
};
