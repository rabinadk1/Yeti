const auth = firebase.auth();

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      if (["T", "V", "H", "R"].includes(idTokenResult.claims.role)) {
        user.role = idTokenResult.claims.role;
        console.log("here");
      } else console.log("Not Here");
      setupUI(user);
    });
    // user logged in
    const helpButton = document.querySelector("#help-button");
    helpButton.innerHTML = `
      <span>
        <a class="waves-effect waves-light btn-large btn-flat red white-text">Help me<i
            class="material-icons left">report</i></a>
      </span>
      `;
  } else {
    // user logged out
    setupUI();
    document.querySelector("#help-button").innerHTML = "";
  }
});

// sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", event => {
  event.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const role = signupForm.querySelector('input[type="radio"]:checked').value;
  //sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      return db
        .collection("users")
        .doc(credentials.user.uid)
        .set({
          country: signupForm["signup-country"].value,
          role: role
        });
    })
    .then(() => {
      const addRole = functions.httpsCallable("addRole");
      addRole({ email: email, role: role });
    })
    .then(() => {
      const sideMenu = document.querySelector("#side-menu");
      M.Sidenav.getInstance(sideMenu).close();
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => {
      console.error(err);
    });
});

//logout mthod
const logout = document.querySelector("#logout");
logout.addEventListener("click", event => {
  event.preventDefault();
  const sideMenu = document.querySelector("#side-menu");
  M.Sidenav.getInstance(sideMenu).close();
  auth.signOut();
});

// login method
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(credentials => {
      const sideMenu = document.querySelector("#side-menu");
      M.Sidenav.getInstance(sideMenu).close();
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch(err => {
      console.error(err);
    });
});
