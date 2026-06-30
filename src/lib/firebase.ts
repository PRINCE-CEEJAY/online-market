// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFireStore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbRhh5LDZyKjkuvnX3MiPNPRm3MgdOzHI',
  authDomain: 'online-market-2433a.firebaseapp.com',
  projectId: 'online-market-2433a',
  storageBucket: 'online-market-2433a.firebasestorage.app',
  messagingSenderId: '1018366759988',
  appId: '1:1018366759988:web:8cceaaf1f308303481e661',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFireStore(app);
