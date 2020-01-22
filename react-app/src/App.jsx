import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Navigation from "./components/Navigation";
import { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          if (["T", "V", "H", "R"].includes(idTokenResult.claims.role)) {
            user.role = idTokenResult.claims.role;
            console.log("here");
          } else console.log("Not Here");
        });
        setAuthUser(user);
      } else setAuthUser(null);
    });
  }, [firebase.auth]);

  return (
    <Router>
      <div className="App">
        <Navigation authUser={authUser} />
        <Container>
          <Switch>
            <Route exact path={ROUTES.HOME} component={LoginPage} />
            <Route path={ROUTES.LOG_IN} component={LoginPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
