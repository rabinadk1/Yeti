import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GetGeoLocation from "../utilities/location.js";

function SignUp() {
  const [state, setState] = useState({});

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (state["password"] !== state["confirmPassword"])
      alert("The passwords don't match!");
    else {
      GetGeoLocation(({ coords }) => {
        const position = { location: [coords.latitude, coords.longitude] };
        if (coords.altitude) position.altitude = coords.altitude;
        setState({ ...state, ...position });
        alert("Your Form Has Been Submitted!");
      }, true);
    }
  };

  return (
    <Form method="post" className="form-signup" onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Re-enter Password"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" block>
        Submit
      </Button>
      <Form.Text className="forgotPassword text-right">
        Already Registered?<Link to="/sign-in">Sign In</Link>
      </Form.Text>
    </Form>
  );
}

export default SignUp;
