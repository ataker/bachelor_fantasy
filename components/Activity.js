import React, { Component, PropTypes } from 'react';

class Activity extends Component {
  render(){
    const { activity, activityCount } = this.props;
    
    let opts = [];
    if(activityCount <=0){
      opts["disabled"] = ("disabled");
    }
    return (
      <div style={{width:"100%"}}>
        <button {...opts} onClick={ e => this.props.onMinus(activity.activityId) } style={{width:"10%",float:"left"}}>-</button>
        <div style={{width:"75%",float:"left",textAlign:"center"}}>{activity.name} <span>{activityCount}</span></div>
        <button style={{width:"10%",float:"left"}} onClick={ e => this.props.onPlus(activity.activityId) }>+</button>
        <div style={{clear:"both"}}></div>
      </div>
    )
  }
}
Activity.propTypes = {
  activity: React.PropTypes.object,
  activityCount: React.PropTypes.number,
  onPlus: React.PropTypes.func,
  onMinus: React.PropTypes.func
}

export default Activity;