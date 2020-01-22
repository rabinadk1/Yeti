// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import { initializeApp, firestore } from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDShxDUf327-0bxbmxklcAjD1RzJjHZPyI",
  authDomain: "yeti-e974f.firebaseapp.com",
  databaseURL: "https://yeti-e974f.firebaseio.com",
  projectId: "yeti-e974f",
  storageBucket: "yeti-e974f.appspot.com",
  messagingSenderId: "951646023489",
  appId: "1:951646023489:web:fdfd736c60befe9ab2fbc0",
  measurementId: "G-YSYM01FL62"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const db = firestore();

// enable offline data
db.enablePersistence().catch(err => {
  switch (err.code) {
    case "failed-precondition":
      // probably multible tabs open at once
      console.log("persistance failed");
      break;
    default:
      // lack of browser support for the feature for error code "unimplemented"
      console.log("persistance not available");
  }
});
