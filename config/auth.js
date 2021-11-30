import { LogLevel } from "@azure/msal-common";

const AzureB2CTenant = process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_DOMAIN;
const AzureB2CClientID = process.env.NEXT_PUBLIC_AZURE_B2C_CLIENT_ID;
const AzureB2CPolicySignUpSignIn = process.env.NEXT_PUBLIC_AZURE_B2C_POLICY || "B2C_1_signin";
const AzureB2CAuthorityBase = `https://${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_NAME}.b2clogin.com/tfp/${AzureB2CTenant}/`;
const AzureB2CAuthority = `${AzureB2CAuthorityBase}${AzureB2CPolicySignUpSignIn}`;

export const msalConfig = {
  auth: {
    clientId: AzureB2CClientID,
    authority: AzureB2CAuthority,
    knownAuthorities: [AzureB2CAuthority],
    redirectUri: "/fromb2c",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {	
          return;	
        }
        switch (level) {	
          case LogLevel.Error:	
            console.error(message);	
            return;	
          case LogLevel.Info:	
            console.info(message);	
            return;	
          case LogLevel.Verbose:	
            console.debug(message);	
            return;	
          case LogLevel.Warning:	
            console.warn(message);	
            return;	
        }
      }
    }
  }
};