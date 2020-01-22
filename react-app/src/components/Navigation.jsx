import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FirebaseContext } from "./Firebase";
import * as ROUTES from "../constants/routes";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);
  return <Button onClick={firebase.SignOut}>Sign Out</Button>;
};

const Navigation = ({ authUser }) => (
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
        {authUser ? (
          <>
            <NavLink className="nav-link" to="#account">
              Account
            </NavLink>
            <SignOutButton />
          </>
        ) : (
          <>
            <NavLink className="nav-link" to={ROUTES.LOG_IN}>
              Log In
            </NavLink>
            <NavLink className="nav-link" to={ROUTES.SIGN_UP}>
              Sign Up
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
