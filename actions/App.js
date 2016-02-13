import { INCREMENT, DECREMENT,
		ADD_CONTESTANT, REMOVE_CONTESTANT, CHANGE_CONTESTANT
 } from './constants';

let nextContestantId = 0;

export function increment(id, currentContestantId){
  return {
    type:INCREMENT,
    id:id,
    currentContestantId:currentContestantId
  };
}

export function decrement(id, currentContestantId){
  return {
    type:DECREMENT,
    id:id,
    currentContestantId:currentContestantId
  };
}

export function addContestant(name){
  return {
    type:ADD_CONTESTANT,
    name:name,
    id: nextContestantId++
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
    index: id
  };
}
