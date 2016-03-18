import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { returnByID, rejectMultiple, getIDList } from "../reducers";

import * as actions from "../actions/app"

class AddContestants extends Component {
  componentDidMount() {
      this.props.activityActions.loadContestants();
      this.props.activityActions.loadActivities();
  }
  render(){
    const { activityActions, contestants, contestantList } = this.props;
    let addedContestantIDs = contestants.reduce(getIDList("contestantID"),[]);
    return (
      <div className="container-fluid">
        {/*<button onClick={ e => activityActions.loadContestants() }>TEST</button>*/}
        <div className="row col-xs-6">
          <div>Add Contestant:</div>
          
          {contestantList.reduce(rejectMultiple("contestantID",addedContestantIDs),[]).map(function(contestant, i){
            return(
              <div key={i} onClick={ e => {
                activityActions.addContestant(contestantList.filter(returnByID("contestantID",contestant.contestantID))[0])
                } }>{contestant.name}
                <button>+</button>
              </div>
          )})}
        </div>
        <div className="row col-xs-6">
          <div>Current Team:</div>
          {contestants.map(function(contestant, i){
          return (
            <div onClick={ e => activityActions.removeContestant(contestant.contestantID) } key={i}>
              {contestant.name}
              <button>-</button>
            </div>
          )})}
          {contestants.length > 0 ? <Link to='/home'>Go</Link> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
   contestants : state.contestants,
   contestantList : state.contestantList
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)  
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddContestants)