import app from "firebase/app";
import "firebase/auth";

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
  }

  // Auth API
  CreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  SignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  SignOut = () => this.auth.signOut();

  ResetPassword = email => this.auth.sendPasswordResetEmail(email);
  UpdatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;

