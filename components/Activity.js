import React, { Component, PropTypes } from 'react';

class Activity extends Component {
  render(){
    let activity = this.props.activity;
    return (
      <div style={{width:"100%"}}>
        <button onClick={ e => this.props.onMinus(activity.id) } style={{width:"10%",float:"left"}}>-</button>
        <div style={{width:"75%",float:"left",textAlign:"center"}}>{activity.name} <span>{activity.count}</span></div>
        <button style={{width:"10%",float:"left"}} onClick={ e => this.props.onPlus(activity.id) }>+</button>
        <div style={{clear:"both"}}></div>
      </div>
    )
  }
}
Activity.propTypes = {
  activity: React.PropTypes.object,
  onPlus: React.PropTypes.func,
  onMinus: React.PropTypes.func
}

export default Activity;