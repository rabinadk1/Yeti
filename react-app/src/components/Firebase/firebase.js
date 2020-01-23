import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

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

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    // enable offline data
    this.db.enablePersistence().catch(err => {
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
    this.functions = app.functions();
  }

  // Auth API
  CreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  SignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  SignOut = () => this.auth.signOut();

  // ResetPassword = email => this.auth.sendPasswordResetEmail(email);
  // UpdatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
