// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBMBeZWat1NbipOtB_fNwWg1Z7kBkaBRc",
  authDomain: "editor-app-ntn1.firebaseapp.com",
  projectId: "editor-app-ntn1",
  storageBucket: "editor-app-ntn1.appspot.com",
  messagingSenderId: "777314364295",
  appId: "1:777314364295:web:a311533c50ad39e10e4122",
  measurementId: "G-J0FVQV95BW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
