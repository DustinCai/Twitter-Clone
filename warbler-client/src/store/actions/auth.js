import { apiCall, setHeaderTokens } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

// need a token in the header for when the user is logged in
export function setAuthorizationToken(token){
  setHeaderTokens(token);
}

export function logout(){
  return dispatch => {
    localStorage.clear();         // log a user out by remove a token from local storage
    setAuthorizationToken(false);
    dispatch(setCurrentUser({})); // clear current user stage by setting it as an empty obj
  }
}

export function authUser(type, userData){
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the api call to finish before we dispatch an action
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user })=> { //destructure the response
          localStorage.setItem("jwtToken", token);  // mark a user as logged in with a jwt token
          setAuthorizationToken(token);   // pass token to header for all future axios requests
          dispatch(setCurrentUser(user)); // dispatch our action creator
          dispatch(removeError());  // if there are any previous errors, dispatch error
          resolve();  // api call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message)); // if there any errors that get created; message is coming from our server in our err obj
          reject();   // api call failed
        });
    });
  };
}
