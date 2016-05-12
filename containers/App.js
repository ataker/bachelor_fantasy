import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { returnById, getContestantTotal, getTotal } from "../reducers"

import Activity from "../components/activity"
import * as actions from "../actions/app"

class App extends Component {
  render(){
    const { contestantList, roster, currentContestant, currentContestantId, activityActions, currContestantTotal, activityList,
            total, activities } = this.props;
    if(!currentContestantId)
      return <div></div>

    return (
      <div>
        <div>
          {roster.map((contestantId, i) =>{
            let contestant = contestantList[contestantId]
            let selected = (currentContestantId === contestantId ? {fontWeight:"bold"} : {})
            return(
              <div key={i} style={selected} onClick={ e => activityActions.changeContestant(contestantId) } >
                {contestant.name}
              </div>
          )})}
        </div>
        
        {Object.keys(activityList).map(function(activityId, i){
          let activity = activityList[activityId]
          let activityCount = ( activities[`${currentContestantId}_${activity.activityId}`] ? activities[`${currentContestantId}_${activity.activityId}`] : 0 )
          return(
            <Activity key={i} activity={activity} activityCount={activityCount} onPlus={ id => activityActions.increment(id, currentContestantId) }
              onMinus={ id => activityActions.decrement(id, currentContestantId) } />
          )})}
        <div>{currentContestant.name}s Total: { currContestantTotal }</div>
        <div>Total: { total }</div>
        <p>Initials:<input name="initials" /></p>
        <input type="submit" />
      </div>

    )
  }
}

function mapStateToProps(state) {
  let currContId = state.app.currentContestantId;
  let currCont = state.contestantList[currContId]
  return { 
    contestantList : state.contestantList,
    roster:state.roster,
    activityList:state.activityList,
    activities:state.activities,
    currentContestant: currCont,
    currentContestantId: currContId,
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