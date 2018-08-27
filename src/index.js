
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.4.1";

import indexRoutes from "routes/index.jsx";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './store';

//import configureStore from './store/configureStore'

const hist = createBrowserHistory();

//const store = configureStore()

// const initialState = [
//   'Smells like spirit',
//   'Enter Sandman'
// ];
//
// function playlist(state = initialState, action) {
//   if (action.type === 'SING_UP') {
//     return [
//       ...state,
//       action.payload
//     ];
//   }
//   return state;
// }
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = createStore(playlist);

ReactDOM.render(
<Provider store={store}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
