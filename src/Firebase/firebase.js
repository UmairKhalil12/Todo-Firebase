// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAawKp_W4QZYDYfzIQ70-ZDZdGInnzFjgA",
  authDomain: "todo-firebase-39f2e.firebaseapp.com",
  projectId: "todo-firebase-39f2e",
  storageBucket: "todo-firebase-39f2e.appspot.com",
  messagingSenderId: "632753919690",
  appId: "1:632753919690:web:2fa68b773f4627a28f0633"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
