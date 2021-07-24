import axios from "axios";

export function setHeaderTokens(token){
  if(token){
    axios.defaults.header.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"]; 
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
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data)
      })
      .catch(err => {
        return reject(err.response.data.error)
      });
  });
}
