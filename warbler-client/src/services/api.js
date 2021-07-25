import axios from "axios";

// attaches token to any request when the user logs in
export function setHeaderTokens(token){
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // when user is logs in, attach token to all future reqs so that the server looks who we are & logged in
  } else {
    delete axios.defaults.headers.common["Authorization"];  // when the user logs out, remove the token
  }
}

/*
* A wrapper around axios API call that formats errors, etc
* @param {string} method the HTTP verb you want to use
* @param {string} path the route path / endpoint
* @param {object} data (optional) data in JSON form for POST requests
*/
// returns a new promise that is resolved when our actions have resolved
export function apiCall(method, path, data){
  return new Promise((resolve, reject) => {
    // make an axios req, it will return a func that we will invoke with path & data, return the res from that func
    return axios[method.toLowerCase()](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
