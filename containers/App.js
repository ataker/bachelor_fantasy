import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { returnByID, getContestantTotal, getTotal } from "../reducers"

import Activity from "../components/activity"
import * as actions from "../actions/app"

class App extends Component {
  render(){
    const { contestants, currentContestant, currentContestantID, activityActions, currContestantTotal,
            total } = this.props;
    if(!contestants[0]){
      return <div></div>
    }
    return (
      <div>
        <div>
          {contestants.map((contestant, i) =>{
            let selected = (currentContestantID === contestant.contestantID ? {fontWeight:"bold"} : {})
            return(
              <div key={i} style={selected} onClick={ e => activityActions.changeContestant(contestant.contestantID) } >
                {contestant.name}
              </div>
          )})}
        </div>
        
        {currentContestant.activities.map(function(activity, i){
          return(
          <Activity key={i} activity={activity} onPlus={ id => activityActions.increment(id, currentContestantID) }
            onMinus={ id => activityActions.decrement(id, currentContestantID) } />
        )})}
        <div>{currentContestant.name}s Total: { currContestantTotal }</div>
        <div>Total: { total }</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let currContID = state.app.currentContestantID;
  let currCont = state.contestants.filter(returnByID("contestantID",currContID))[0];
  return { 
    contestants:state.contestants,
    currentContestant: currCont,
    currentContestantID: currContID,
    currContestantTotal: getContestantTotal(currCont),
    total: getTotal(state.contestants)
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)