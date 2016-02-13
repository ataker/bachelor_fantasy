import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
/*
import Activity from "../components/activity"
*/
//import { addContestant } from "../actions/app"
import * as actions from "../actions/app"

class AddContestants extends Component {
  render(){
    const { activityActions, contestants } = this.props;
    //console.log(this.props);
    return (
      <div>
        <div>Add Contestant:</div>
        <input type="text" ref="name"/>
        <button onClick={ e => activityActions.addContestant(this.refs.name.value) }>+</button>
        {contestants.map(function(contestant, i){
        return (
          <div key={i}>
            {contestant.name}
            <button onClick={ e => activityActions.removeContestant(i) }>-</button>
          </div>
        )})}
        {contestants.length > 0 ? <Link to='/home'>Go</Link> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
   contestants:state.contestants
  }
}
function mapDispatchToProps(dispatch) {
  return { 
   activityActions : bindActionCreators(actions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddContestants)