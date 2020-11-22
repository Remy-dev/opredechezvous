import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import message from './reducers/message';
import messageRoutes from './routes/message';

//import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
// import Welcome from './Welcome';

const history = createBrowserHistory();
const store = createStore(
    combineReducers({
        message,
        router: connectRouter(history),
        form,
        /* Add your reducers here */
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
           <Switch >
               { messageRoutes }
           </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
