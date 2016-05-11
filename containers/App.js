import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { returnById, getContestantTotal, getTotal } from "../reducers"

import Activity from "../components/activity"
import * as actions from "../actions/app"

class App extends Component {
  render(){
    const { contestants, currentContestant, currentContestantId, activityActions, currContestantTotal, activityList,
            total, roster } = this.props;
    if(!contestants[0]){
      return <div></div>
    }
    return (
      <div>
        <div>
          {contestants.map((contestant, i) =>{
            let selected = (currentContestantId === contestant.contestantId ? {fontWeight:"bold"} : {})
            return(
              <div key={i} style={selected} onClick={ e => activityActions.changeContestant(contestant.contestantId) } >
                {contestant.name}
              </div>
          )})}
        </div>
        
        {activityList.map(function(activity, i){
          let activityCount = (currentContestant.activities[activity.activityId] ? currentContestant.activities[activity.activityId].count : 0 )
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
  let currCont = state.contestants.filter(returnById("contestantId",currContId))[0];
  return { 
    contestants:state.contestants,
    roster:state.roster,
    activityList:state.activityList,
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