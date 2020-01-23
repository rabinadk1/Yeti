import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Navigation from "./components/Navigation";
import { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Volunteer from "./components/Volunteer";
import HospitalInfo from "./components/HospitalInfo";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult.claims);
          // if (["T", "V", "H", "R"].indexof(idTokenResult.claims.role) !== -1) {
          //   user.role = idTokenResult.claims.role;
          // } else console.log("Not Here");
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
            <Route path={ROUTES.VOLUNTEER} component={Volunteer} />
            <Route path={ROUTES.HOSPITAL_INFO} component={HospitalInfo} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
