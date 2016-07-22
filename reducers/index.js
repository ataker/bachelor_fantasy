import { combineReducers } from 'redux'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import {  
          INCREMENT, DECREMENT
          ,ADD_CONTESTANT, REMOVE_CONTESTANT, CHANGE_CONTESTANT, LOAD_CONTESTANTS, LOAD_ACTIVITIES
        } from '../actions/constants'

const counter = (state = 0 , action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      if(state.count === 0){
        return state
      }
      return state - 1
    default:
      return state
  }
}

const activities = (state = {}, action) => {
  switch(action.type){
    case INCREMENT:
    case DECREMENT:
      //let id = `${action.contestantId}_${action.activityId}`
      return Object.assign({}, state, { [action.activityId] : counter( state[action.activityId] , action) })
    default:
      return state
  }
}

//array of contestantIds
const roster = (state = [], action) =>{
  switch(action.type){
    case ADD_CONTESTANT:
      return [
        ...state,
        action.id
      ]
    case REMOVE_CONTESTANT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const app = (state = {}, action) =>{
  switch(action.type){
    case ADD_CONTESTANT:
      return Object.assign({}, state, {
        currentContestantId: action.id
      })
    case CHANGE_CONTESTANT:
      return Object.assign({}, state, {
        currentContestantId: action.id
      })
    default:
      return state
  }
}

const contestantList = (state = {}, action) =>{
  switch(action.type){
    case LOAD_CONTESTANTS:
      return action.contestants.reduce( (list, contestant) =>{
        list[contestant.contestantId] = Object.assign({}, contestant, {activities:{}})
        return list
      }, {} )
    case INCREMENT:
    case DECREMENT:
      let curr = state[action.contestantId]
      let neww =  Object.assign({}, curr, {activities:activities(curr.activities, action)})
      
      return Object.assign({}, state, {[action.contestantId]: neww })//{activities: activities(state[action.contestantId.activities], action) } })    
       
    default:
      return state
  }
}

const activityList = (state = {}, action) =>{
  switch(action.type){
    case LOAD_ACTIVITIES:
      return action.activities.reduce( (list, activity) =>{
        list[activity.activityId] = activity
        return list
      }, {} )
    default:
      return state
  }
}


export const getContestantTotal = (contestant) => {
  //@TODO
  return 0
  if(!contestant)
    return 0
  return contestant.activities.reduce((total, activity) => {
    return total + (activity.count * activity.points)
  }, 0)
}

export const getTotal = (contestants) => {
  //@TODO
  return 0
  return contestants.reduce((total, contestant) => {
    return total + getContestantTotal(contestant)
  }, 0)
}

//@TODO seems like I should be able to pull out the (idName, id) thing
export const returnById = function returnById(idName, id) {
  return function(obj){
    return obj[idName] == id
  }
}

export const reject = function reject(idName, id) {
  return function (retVal, obj) {
    if(obj[idName] !== id){retVal.push(obj)}
    return retVal
  }
}

export const rejectMultiple = function rejectMultiple(idName, ids){
  return function (retVal, obj) {
    if(ids.indexOf(obj[idName]) === -1){retVal.push(obj)}
    return retVal
  }
}

export const getIdList = function getIdList(idName){
  return function (retVal, obj) {
    retVal.push(obj[idName])
    return retVal
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  activities,
  contestantList,
  roster,
  activityList,
  app
})

export default rootReducer