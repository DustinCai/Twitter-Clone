import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore(); // create a store

// check if there is already a token when the page is refreshed
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken); // add token to auth header for all future reqs
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken))); // rehydrate
  } catch(err) {
    store.dispatch(setCurrentUser({})); // if someone is tampering, force them to log out
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
