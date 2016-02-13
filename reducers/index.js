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
  { name:"Kiss", points:5 },
  { name:"Make out", points:2 },
  { name:"Get rose at Rose Ceremony", points:10 },
  { name:"Get a rose pre-ceremony", points:15 },
  { name:"Enter the hot tub", points:4 },
  { name:"Dance", points:5 },
  { name:"Give Bachelor or Bachelorette gift", points:7 },
  { name:"Learn to get over fears", points:5 },
  { name:"Steal Bachelor or Bachelorette away from another woman or man", points:3 },
  { name:"Actually says \"Can I steal you away\"", points:1 },
  { name:"Take a helicopter", points:5 },
  { name:"Ride or drive in a sports car", points:3 },
  { name:"Participate in extreme sports", points:3 },
  { name:"Experience local culture (Destination Dates)", points:4 },
  { name:"Refer to your sexual anatomy", points:10 },
  { name:"Say \"is the perfect place to fall in love\"", points:5 },
  { name:"Tell Bachelor or Bachelorette you see a future with him/her", points:5 },
  { name:"Tell Bachelor or Bachelorette about family", points:5 },
  { name:"Tell Bachelor or Bachelorette about an ex", points:5 },
  { name:"Tell Bachelor or Bachelorette he or she's attractive", points:5 },
  { name:"Tell Bachelor or Bachelorette you're in love / falling for him /  her", points:7 },
  { name:"Cry, having tears in your eyes or on your cheeks", points:2 },
  { name:"Cry, having a mega sobbing meltown", points:4 },
  { name:"Fight with another contestant", points:5 },
  { name:"Be obviously drunk", points:5 },
  { name:"Say \"vulnerable\"", points:3 },
  { name:"Say \"I'm falling in love with you\"", points:3 },
  { name:"Say \"I love/I'm in love with you\"", points:5 },
  { name:"Swear (max per episode)", points:1 },
  { name:"Tattle", points:3 },
  { name:"Get naked", points:5 },
  { name:"Require medical attention", points:10 },
  { name:"Say \"for the right reasons\"", points:5 },
  { name:"Get caught with secret boyfriend of girlfirend", points:20 },
  { name:"Wear and ugly accessory", points:3 },
  { name:"Exploit your child's existence for personal gain", points:5 },
  { name:"Be called \"good mom/dad\" material", points:3 },
  { name:"Be told the Bachelor or Bachelorette sees a future with you", points:3 },
  { name:"Have Bachelor or Bachelorette express confusion about why you aren't liked by the other contestants", points:3 },
  { name:"Have Bachelor or Bachelorette question your intelligence", points:3 },
  { name:"Be called \"intense\" by Bachelor or Bachelorette", points:3 },
  { name:"Go on a solo date", points:-10 },
  { name:"Leave the show voluntarily", points:-20 },
  { name:"Get sent home pre-ceremony", points:-15 },
  { name:"Get sent home at Rose Ceremony", points:-10 }
];

const activities = (state = [], action) => {
  switch(action.type){
    case ADD_CONTESTANT:
      return initialActivitiesState.map( (activity, i ) =>{
        activity.count = 0;
        activity.id = i;
        return activity;
      })

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

export const getContestantTotal = (contestant) => {
  if(!contestant)
    return 0;
  return contestant.activities.reduce((total, activity) => {
    return total + (activity.count * activity.points)
  }, 0)
}

export const getTotal = (contestants) => {
  return contestants.reduce((total, contestant) => {
    return total + getContestantTotal(contestant)
  }, 0)
}

const returnByID = function returnByID(obj) {
  return obj.id === this
}

const rootReducer = combineReducers({
  routing: routeReducer,
  contestants,
  app
});

export default rootReducer;