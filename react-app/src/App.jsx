import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Volunteer from "./components/Volunteer";
import HospitalInfo from "./components/HospitalInfo";
import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Firebase, { FirebaseContext } from "./components/Firebase";
import * as ROUTES from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);
  return <Button onClick={firebase.SignOut}>Sign Out</Button>;
};

function App() {
  return (
    <div>
      {/*
      <Router>
        <div className="App">
          <FirebaseContext.Provider value={new Firebase()}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <NavLink className="navbar-brand" to={ROUTES.HOME}>
                Yeti
              </NavLink>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                  <NavLink className="nav-link" to="#features">
                    Features
                  </NavLink>
                  <NavLink className="nav-link" to="#pricing">
                    Pricing
                  </NavLink>
                </Nav>
                <Nav>
                  <NavLink className="nav-link" to={ROUTES.LOG_IN}>
                    Log In
                  </NavLink>
                  <NavLink className="nav-link" to={ROUTES.SIGN_UP}>
                    Sign Up
                  </NavLink>
                  <SignOutButton />
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Container>
              <Switch>
                <Route exact path={ROUTES.HOME} component={LoginPage} />
                <Route path={ROUTES.LOG_IN} component={LoginPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              </Switch>
            </Container>
          </FirebaseContext.Provider>
        </div>
      </Router>
      */}
      <Router>
        <Route exact path="/" component={Volunteer} />
        {/* This must be removed when integrated */}
        <Route exact path="/Volunteer" component={Volunteer} />
        <Route
          path="/Volunteers/HospitalsInfo"
          exact
          component={HospitalInfo}
        />
      </Router>
    </div>
  );
}

export default App;
