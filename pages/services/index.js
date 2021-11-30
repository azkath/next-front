import { getAccessToken, setActive, loginPopUp, logoutPopUp, msalInstance } from "./authService";
import { signUp, checkToken, signOut } from "./userService";

export{
  getAccessToken,
  setActive,
  loginPopUp,
  msalInstance,
  logoutPopUp,
  signUp,
  signOut,
  checkToken
}