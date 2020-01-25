import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SessionContext from "./components/SessionContext";

//Lazy Loading, Splitting chunks into different javascript files
const LoginPage = lazy(() => import("./components/Login"));
const SignUpPage = lazy(() => import("./components/SignUp"));
const HospitalInfo = lazy(() => import("./components/HospitalInfo"));
const MapShowingOther = lazy(() => import("./components/MapShowingOther"));
const Navigation = lazy(() => import("./components/Navigation"));
const Volunteer = lazy(() => import("./components/Volunteer"));
const Tourist = lazy(() => import("./components/Tourist"));
const Homepage = lazy(() => import("./components/Homepage"));
const AccountPage = lazy(() => import("./components/AccountPage"));

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
        <Suspense fallback={<h3 className="m-5 text-center">Loading...</h3>}>
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
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              </SessionContext.Provider>
            </Switch>
          </Container>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
