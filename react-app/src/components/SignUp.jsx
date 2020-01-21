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
    <>
      <h3 className="text-center mt-2">Sign Up</h3>

      <Form method="post" className="form-signup" onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            placeholder="eg: John"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            placeholder="eg: Doe"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="eg: pranav@explorer.com"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            type="tel"
            placeholder="eg: 9868986821"
            minlength="8"
            maxlength="10"
            onChange={handleChange}
            required
          />
          <Form.Text class="text-muted">
            Please enter number without country code but enter region code for
            landlines
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formUserType">
          <Form.Label>User Type</Form.Label>
          <Form.Control name="userType" as="select" onChange={handleChange}>
            <option value="T">Tourist</option>
            <option value="V">Volunteer</option>
            <option value="R">Rescue Team</option>
            <option value="H">Health Post / Hospital</option>
          </Form.Control>
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
        <Form.Text className="text-center">
          Already Registered? <Link to="/log-in">Sign In</Link>
        </Form.Text>
      </Form>
    </>
  );
}

export default SignUp;
