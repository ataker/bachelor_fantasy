import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activity from "../components/activity"
import * as actions from "../actions/app"

class App extends Component {
  render(){
    const { contestants, currContestant, activityActions } = this.props;
    if(!contestants[0]){
      return <div></div>
    }
    return (
      <div>
        <div>
          {contestants.map((contestant, i) =>{
            let selected = (currContestant === i ? {fontWeight:"bold"} : {})
            return(
              <div key={i} style={selected} onClick={ e => activityActions.changeContestant(i) } >
                {contestant.name}
              </div>
          )})}
        </div>
      
        {contestants[currContestant].activities.map(function(activity, i){
          return(
          <Activity key={i} activity={activity} onPlus={ id => activityActions.increment(id, currContestant) }
            onMinus={ id => activityActions.decrement(id, currContestant) } />
        )})}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
   contestants:state.contestants,
   currContestant: state.app.currentContestantIndex
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)