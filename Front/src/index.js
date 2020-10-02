// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//@api-platform
import ReactDOM from 'react-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { reducer as form } from 'redux-form';
// import { Route, Switch } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';
// import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
import { BrowserRouter as Router } from 'react-router-dom';
// == Import : local
// Composants
import Opre from 'src/components/Opre';
// Store
import store from 'src/store';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <Router>
      <Opre />
    </Router>
  </Provider>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
