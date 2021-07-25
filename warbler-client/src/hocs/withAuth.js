// handles validation to make sure that a user is logged in before they see whatever component is passed
// to this function

import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRendered){
  class Authenticate extends Component {
    // when the component first loads
    componentWillMount(){
      if(this.props.isAuthenticated === false ){  // if user is not authenticated, redirect back to sigin
        this.props.history.push("/signin");
      }
    }

    // whenever the component changes for any reason
    componentWillUpdate(nextProps){                    // in the event that the component updates, we'll check if any of the
      if(nextProps.props.isAuthenticated === false ){  // next props that the component is getting is still authenticated
        this.props.history.push("/signin");       // if not, redirect back to signin
      }
    }

    // if everything is good and the user is authenticated, return the component to be rendered
    render(){
      return <ComponentToBeRendered {...this.props} />
    }
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(Authenticate);
}
