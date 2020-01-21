import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as NavLink,
  Switch
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar expand="lg" bg="light" fixed="top">
          <Container>
            <NavLink className="navbar-brand" to="/sign-in">
              Yeti
            </NavLink>
            <Navbar.Collapse id="navbarTogglerDemo02">
              <Nav className="ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign up
                  </NavLink>
                </li>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
