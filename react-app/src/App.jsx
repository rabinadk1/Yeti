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
      user ? setAuthUser(user) : setAuthUser(null);
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
