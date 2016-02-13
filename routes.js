import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import AddContestants from './containers/AddContestants';
import App from './containers/App';



class Routes extends Component {
  render(){
    
    return(
      <Router history={this.props.history}>
        <Route path="/" component={AddContestants} />
        <Route path="home" component={App}/>
      </Router>
    )
  }
}
Routes.propTypes = {
  history: PropTypes.object.isRequired

};
export default Routes;