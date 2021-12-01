import { getAccessToken, setActive, loginPopUp, checkAuth, logoutPopUp, msalInstance } from "./authService";
import { signUp, checkToken, signOut } from "./userService";
import { createGame, getListGame, updateGame, deleteGame } from "./gameService";

export{
  getAccessToken,
  setActive,
  loginPopUp,
  msalInstance,
  logoutPopUp,
  checkAuth,
  signUp,
  signOut,
  checkToken,
  createGame,
  updateGame,
  deleteGame,
  getListGame
}