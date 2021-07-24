import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value  // generic handle change for our any inputs
    });
  };

  handleSubmit = e => {
    e.preventDefault();   // so the page doesn't refresh
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      console.log("LOGGED IN SUCCESSFULLY");
    });
  }

  render(){
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText, signUp } = this.props;

    return(
      <div>
        <div className="row justify-content md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2> {heading} </h2>

              <label htmlFor="email"> Email: </label>
              <input
                autoComplete="off"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              />

              <label htmlFor="password"> Password: </label>
              <input
                autoComplete="off"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />


              {/* Display if signup */}
              {signUp && (
                <div>
                  <label htmlFor="username"> Username </label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    type="text"
                  />

                  <label htmlFor="image-url"> Image URL </label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="image-url"    // match with htmlFor
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    value={profileImageUrl}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                { buttonText }
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm; 
