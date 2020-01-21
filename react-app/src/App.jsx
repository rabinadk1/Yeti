import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <NavLink className="navbar-brand" to="/">
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
              <NavLink className="nav-link" to="/log-in">
                Log In
              </NavLink>
              <NavLink className="nav-link" to="/sign-up">
                Sign Up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/log-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
