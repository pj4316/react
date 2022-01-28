import { CssBaseline, ThemeProvider } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routes';
import RootStore from './stores/RootStore';
import { customTheme } from './theme/CustomTheme';

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
});

configure({ enforceActions: 'observed' })

export const root = new RootStore();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  root.firebaseSessionStore.setUser(user);

  ReactDOM.render(
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <Root/>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
