import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Fashion Affiliate Platform</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;