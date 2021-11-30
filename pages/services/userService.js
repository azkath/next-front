import axios from "axios";

export const signUp = (accessToken, scb, fcb) => {
  axios.post('http://localhost:1337/api/v1/signUp', accessToken).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}

export const signOut = (accessToken, scb, fcb) => {
  axios.post('http://localhost:1337/api/v1/signOut', accessToken).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}

export const checkToken = (accessToken, scb, fcb) => {
  const data = {
    accessToken: accessToken
  }
  axios.get('http://localhost:1337/api/v1/check', {params: accessToken}).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}