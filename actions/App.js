import fetch from 'isomorphic-fetch'
import { INCREMENT, DECREMENT,
		ADD_CONTESTANT, REMOVE_CONTESTANT, CHANGE_CONTESTANT, LOAD_CONTESTANTS, LOAD_ACTIVITIES
 } from './constants';


export function increment(activityId, contestantId){
  return {
    type:INCREMENT,
    activityId:activityId,
    contestantId:contestantId
  };
}

export function decrement(activityId, contestantId){
  return {
    type:DECREMENT,
    activityId:activityId,
    contestantId:contestantId
  };
}

export function addContestant(id){
  return {
    type:ADD_CONTESTANT,
    id:id
  };
}

export function removeContestant(index){
  return {
    type:REMOVE_CONTESTANT,
    index: index
  };
}

export function changeContestant(id){
  return {
    type:CHANGE_CONTESTANT,
    id: id
  };
}

export function loadContestants(){
  return dispatch => {
    return fetch(`http://localhost:3001/getContestants`)
      .then(response => response.json())
      .then(json => dispatch(loadedContestants(json)))
  }
}
function loadedContestants(data) {
  return {
    type:LOAD_CONTESTANTS,
    contestants: data
  };
}

export function loadActivities(){
  return dispatch => {
    return fetch(`http://localhost:3001/getActivities`)
      .then(response => response.json())
      .then(json => dispatch(loadedActivities(json)))
  }
}
function loadedActivities(data) {
  return {
    type:LOAD_ACTIVITIES,
    activities: data
  };
}
