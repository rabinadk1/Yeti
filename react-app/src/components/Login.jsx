import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import SessionContext from "./SessionContext";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "./Firebase/context";

const InitialState = {
  email: "",
  password: "",
  rememberMe: false,
  error: null
};

const LoginPage = () => {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (authUser) history.push(ROUTES.HOME);

  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(InitialState);

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState({ ...state, [target.name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    firebase
      .SignInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        setState(InitialState);
        history.push(ROUTES.VOLUNTEER);
      })
      .catch(error => {
        setState({ ...state, error });
      });
  };

  return (
    <>
      {state.error && <Alert variant="danger">{state.error.message}</Alert>}

      <h3 className="text-center mt-2">Login</h3>
      <Form className="form-signin" method="post" onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label className="sr-only">Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="sr-only">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRemberMeCheckbox">
          <Form.Check
            type="checkbox"
            name="rememberMe"
            label="Remember Me"
            checked={state.rememberMe}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Submit
        </Button>

        <Form.Text className="text-center">
          <Link to="#">Forgot Password?</Link>
        </Form.Text>
      </Form>
    </>
  );
};

export default LoginPage;
