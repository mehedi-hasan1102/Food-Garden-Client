// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyArKrM2kEHYe830CqZSxCZarwPfq6egKLY",
  authDomain: "practise---firebase-auth.firebaseapp.com",
  projectId: "practise---firebase-auth",
  storageBucket: "practise---firebase-auth.firebasestorage.app",
  messagingSenderId: "840779043842",
  appId: "1:840779043842:web:00eb5c7e3df94f477cc31b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase auth (optional)
export const auth = getAuth(app);
export default app;


export const db = getFirestore(app);


// import 
import { getFirestore } from "firebase/firestore";
