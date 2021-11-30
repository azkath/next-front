import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './services';

export default function MyApp({ Component, pageProps }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  )
}
