// src/test-firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth'; // Optional: Test Auth

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const runFirebaseTest = async () => {
  try {
    console.log('🚀 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Test 1: Check Initialization
    console.log('✅ Firebase initialized successfully!', app.name);

    // Test 2: Try a simple Read (Fetch collection list)
    // Replace 'test_collection' with any existing collection or one you create
    console.log('📡 Pinging Firestore...');
    const querySnapshot = await getDocs(collection(db, 'test_collection'));
    console.log(
      `✅ Firestore connected! Found ${querySnapshot.size} documents in 'test_collection'.`,
    );

    // Test 3: Try a simple Write (Optional - creates a document)
    // Uncomment to test write permissions

    const docRef = await addDoc(collection(db, 'test_collection'), {
      test: true,
      timestamp: new Date(),
      message: 'Connection successful!',
    });
    console.log('✅ Write successful! Document ID:', docRef.id);

    // Test 4: Auth (Optional)
    const auth = getAuth(app);
    await signInAnonymously(auth);
    console.log('✅ Auth connected! User UID:', auth?.currentUser?.uid);
  } catch (error) {
    console.error('❌ Firebase Test Failed:', error.message);
    console.error('Full Error:', error);
  }
};
