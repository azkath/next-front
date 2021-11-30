import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../config/auth";


export const msalInstance = new PublicClientApplication(msalConfig);

export const getAccessToken = async (instance) => {
  try {
    const tokenRequest = {
      scopes: [process.env.NEXT_PUBLIC_AZURE_B2C_CLIENT_ID]
    };
    const token = await instance.acquireTokenSilent(tokenRequest);
    console.log('tok', token);
    return token.accessToken;
  } catch (error) {
    return 'invalidToken';
  }
}

export const setActive = async (instance, account, scb, fcb) => {
  try {
    const active = await instance.setActiveAccount(account)
    console.log('res', active);
    return scb(active);
  } catch (error) {
    return fcb && fcb(error);
  }
}

export const loginPopUp = async (scb) => {
  await msalInstance.acquireTokenPopup({ scopes: [] }).then(async (response) => {
    await msalInstance.setActiveAccount(response.account)
    return response;
  })
}

export const logoutPopUp = async () => await msalInstance.logoutPopup();