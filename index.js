import React from 'react';

import { render } from 'react-dom';
import configureStore from './store/configureStore';
import createHistory from 'history/lib/createBrowserHistory';
const { syncReduxAndRouter, pushPath } = require('redux-simple-router');

///import App from './containers/app';
import Routes from './routes';
import { connect, Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
//require('./styles/style.scss');

const store = configureStore();
persistStore(store)
const history = createHistory();
syncReduxAndRouter(history, store);

render(
  <div>
    <Provider store={store}>
        <Routes history={history}/>
    </Provider>
  </div>,
  document.getElementById('root')
);


if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  require('./createDevToolsWindow').default(store);
}