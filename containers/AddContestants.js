import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { returnById, rejectMultiple, getIdList } from "../reducers";

import * as actions from "../actions/app"

class AddContestants extends Component {
  componentDidMount() {
      this.props.activityActions.loadContestants()
      this.props.activityActions.loadActivities()
  }
  render(){
    const { activityActions, contestantList, roster } = this.props
    
    return (
      <div className="container-fluid">
        {/*<button onClick={ e => activityActions.loadContestants() }>TEST</button>*/}


        <div className="row col-xs-6">
          <div>Add Contestant:</div>
          {Object.keys(contestantList).diff(roster).map(function(contestantId, i){
            let contestant = contestantList[contestantId]
            return(
              <div key={i} onClick={ e => {
                activityActions.addContestant(contestantId)
                } }>{contestant.name}
                <button>+</button>
              </div>
          )})}
        </div>


        <div className="row col-xs-6">
          <div>Current Team:</div>
          {roster.map(function(contestant, i){
            let name = contestantList[contestant].name
            return (
              <div onClick={ e => activityActions.removeContestant(i) } key={i}>
                {name}
                <button>-</button>
              </div>
            )})}
          {roster.length > 0 ? <Link to='/home'>Go</Link> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
   //contestants : state.contestants,
   roster : state.roster,
   contestantList : state.contestantList
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)  
  }
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContestants)