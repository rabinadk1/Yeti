import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const [state, setState] = useState({});

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState({ ...state, [target.name]: value });
  };

  const handleSubmit = event => {
    alert("Your Form Has Been Submitted!");
    event.preventDefault();
  };

  return (
    <Form className="form-signin" method="post" onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRemberMeCheckbox">
        <Form.Check
          type="checkbox"
          name="rememberMe"
          label="Remember Me"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" block>
        Submit
      </Button>
      <Form.Text className="forgotPassword text-right">
        <Link to="#">Forgot Password?</Link>
      </Form.Text>
    </Form>
  );
}

export default Login;
