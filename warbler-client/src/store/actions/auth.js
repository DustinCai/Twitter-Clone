import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function authUser(type, userData){
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the api call to finish before we dispatch an action
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user })=> { //destructure the response
          localStorage.setItem("jwtToken", token);  // mark a user as logged in
          dispatch(setCurrentUser(user)); // dispatch our action creator
          resolve();  // api call succeeded
        })
        .catch(err => {
          reject();   // api call failed
        });
    });
  }; 
}
