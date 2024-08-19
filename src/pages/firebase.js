// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfpz8oEd5mBWCYvcKDPoJ4zz49Y28zpNw",
  authDomain: "ved-ai.firebaseapp.com",
  projectId: "ved-ai",
  storageBucket: "ved-ai.appspot.com",
  messagingSenderId: "178383077302",
  appId: "1:178383077302:web:391dada57e6361a6864b17",
  measurementId: "G-ZWV3KZK1DJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore database instance
