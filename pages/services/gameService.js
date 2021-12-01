import axios from "axios";

export const createGame = (accessToken, params, scb, fcb) => {
  axios.post('http://localhost:1337/api/v1/game/create', params, {
    headers: { accessToken: accessToken }
  }).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}

export const updateGame = (accessToken, params, scb, fcb) => {
  axios.post('http://localhost:1337/api/v1/game/update', params, {
    headers: { accessToken: accessToken }
  }).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}

export const getListGame = (accessToken, params, scb, fcb) => {
  console.log(12341, accessToken, params);
  axios.get('http://localhost:1337/api/v1/game/list', { params: params, headers: { accessToken: accessToken } }).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}

export const deleteGame = (accessToken, params, scb, fcb) => {
  console.log(12341, accessToken, params);
  axios.get('http://localhost:1337/api/v1/game/delete', { params: params, headers: { accessToken: accessToken } }).then(response => {
    return scb(response.data)
  }).catch(err => {
    return fcb && fcb(err);
  })
}