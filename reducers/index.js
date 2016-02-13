import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

import {  
          INCREMENT, DECREMENT,
          ADD_CONTESTANT, REMOVE_CONTESTANT, CHANGE_CONTESTANT
        } from '../actions/constants';

const activity = (state = {}, action) => {
  if (state.id !== action.id) {
    return state
  }
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case DECREMENT:
      if(state.count === 0){
        return state;
      }
      return Object.assign({}, state, {
        count: state.count - 1
      })
    default:
      return state
  }
}

const initialActivitiesState = [
    {name:"Kiss",points:5,count:0, id:0},
    {name:"Make out",points:2,count:0, id:1}
];

const activities = (state = initialActivitiesState, action) => {
  switch(action.type){
    case INCREMENT:
    case DECREMENT:
      return state.map(t =>
        activity(t, action)
      )
    default:
      return state;
  }
}

const contestant = (state = {}, action) =>{
  switch(action.type){
    case ADD_CONTESTANT:
      return {
          name: action.name,
          id: action.id,
          score:0,
          activities : activities(undefined, action)
        }
    case INCREMENT:
    case DECREMENT:
      if (state.id !== action.currentContestantId) {
        return state
      }
      return Object.assign({}, state, { activities : activities(state.activities, action) } )
    default:
      return state;
  }
}

const contestants = (state = [], action) =>{
  switch(action.type){
    case ADD_CONTESTANT:
      return [
        ...state,
        contestant(undefined, action)
      ]
    case REMOVE_CONTESTANT:
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index + 1),
      ]
    case INCREMENT:
    case DECREMENT:
      return state.map(t =>
        contestant(t, action)
      )
      /*return state.filter(returnByID, action.currentContestantId).map(t =>
          contestant(t, action)
        )I see why this isn't how it's done now*/
    default:
      return state;
  }
}

const app = (state = {currentContestantIndex:0}, action) =>{
  switch(action.type){
    case CHANGE_CONTESTANT:
      return Object.assign({}, state, {
        currentContestantIndex: action.index
      })
    default:
        return state;
  }
}

const returnByID = (obj) => {
  return obj.id === this
}

const rootReducer = combineReducers({
  routing: routeReducer,
  contestants,
  app
});

export default rootReducer;