// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYfQKbbD0UjqzbF8pVe7-TKOUoMI5cgKc",
  authDomain: "example-marketplace-d0f64.firebaseapp.com",
  projectId: "example-marketplace-d0f64",
  storageBucket: "example-marketplace-d0f64.appspot.com",
  messagingSenderId: "698086783372",
  appId: "1:698086783372:web:ed868f76750b87fb89fea9",
  measurementId: "G-KBNH2R0STJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//initialize storage firebase
// const storage = getStorage(firebaseConfig)

export const storage = getStorage(app)