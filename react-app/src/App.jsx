import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import SessionContext from "./components/SessionContext";

//Lazy Loading, Splitting chunks into different javascript files
const LoginPage = lazy(() => import("./components/Login"));
const SignUpPage = lazy(() => import("./components/SignUp"));
const HelpPage = lazy(() => import("./components/HelpPage"));
const HospitalInfo = lazy(() => import("./components/HospitalInfo"));
const MapShowingOther = lazy(() => import("./components/MapShowingOther"));
const Navigation = lazy(() => import("./components/Navigation"));

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
        <Suspense fallback={<h3 className="m-5 text-center">Loading...</h3>}>
          <Navigation authUser={authUser} />
          <Container>
            <Switch>
              <SessionContext.Provider value={authUser}>
                <Route exact path={ROUTES.HOME} component={HelpPage} />
                <Route path={ROUTES.LOG_IN} component={LoginPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.HOSPITAL_INFO} component={HospitalInfo} />
                <Route path={ROUTES.SEE_OTHER} component={MapShowingOther} />
              </SessionContext.Provider>
            </Switch>
          </Container>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
