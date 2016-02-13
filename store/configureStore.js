import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';
//import createHistory from 'history/lib/createBrowserHistory';
//import routes from '../routes';
//import api from '../middleware/api';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
//const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');
//import persistState from 'redux-localstorage'
import { autoRehydrate } from 'redux-persist'


const createStoreWithMiddleware = compose(
	applyMiddleware(thunkMiddleware),//, api),
	autoRehydrate(),
	//applyMiddleware(createLogger()),
	DevTools.instrument()
  //persistState()
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}