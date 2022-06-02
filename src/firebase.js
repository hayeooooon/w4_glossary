// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJf9zRJzqPPKlD8hJHox9Zo3XFJrhKKEI",
  authDomain: "w4assignment-2b985.firebaseapp.com",
  projectId: "w4assignment-2b985",
  storageBucket: "w4assignment-2b985.appspot.com",
  messagingSenderId: "541788247476",
  appId: "1:541788247476:web:3ab8e117f601bd55938ee1",
  measurementId: "G-9NVFWGCXCQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
