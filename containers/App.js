import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getContestantTotal, getTotal } from "../reducers"

import Activity from "../components/activity"
import * as actions from "../actions/app"

class App extends Component {
  render(){
    const { contestants, currentContestantIndex, activityActions, currContestantTotal,
            total } = this.props;
    if(!contestants[0]){
      return <div></div>
    }
    return (
      <div>
        <div>
          {contestants.map((contestant, i) =>{
            let selected = (currentContestantIndex === i ? {fontWeight:"bold"} : {})
            return(
              <div key={i} style={selected} onClick={ e => activityActions.changeContestant(i) } >
                {contestant.name}
              </div>
          )})}
        </div>
        
        {contestants[currentContestantIndex].activities.map(function(activity, i){
          return(
          <Activity key={i} activity={activity} onPlus={ id => activityActions.increment(id, currentContestantIndex) }
            onMinus={ id => activityActions.decrement(id, currentContestantIndex) } />
        )})}
        <div>{contestants[currentContestantIndex].name}s Total: { currContestantTotal }</div>
        <div>Total: { total }</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let currContIndex = state.app.currentContestantIndex
  return { 
   contestants:state.contestants,
   currentContestantIndex: currContIndex,
   currContestantTotal: getContestantTotal(state.contestants[currContIndex]),
   total: getTotal(state.contestants)
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)