import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Navigation from "./components/Navigation";
import { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import HospitalInfo from "./components/HospitalInfo";
import "./App.css";
import Volunteer from "./components/Volunteer";
import Tourist from "./components/Tourist";
import Homepage from "./components/Homepage";
import MapShowingOther from "./components/MapShowingOther";
import SessionContext from "./components/SessionContext";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  // TODO : Fix bug here
  // useEffect resolves after the app is rendered
  // resulting in error while reading user
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          user.tourist = idTokenResult.claims.tourist;
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
            <SessionContext.Provider value={authUser}>
              <Route exact path={ROUTES.HOME} component={Homepage} />

              <Route path={ROUTES.TOURIST} component={Tourist} />
              <Route path={ROUTES.VOLUNTEER} component={Volunteer} />
              <Route path={ROUTES.HOSPITAL_INFO} component={HospitalInfo} />
              <Route path={ROUTES.LOG_IN} component={LoginPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SEE_OTHER} component={MapShowingOther} />
            </SessionContext.Provider>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
