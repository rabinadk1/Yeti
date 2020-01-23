import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import GetGeoLocation from "../utilities/location.js";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "./Firebase/context";
import Maps from "./Maps";

const SignUpPage = () => {
  const InitialState = {
    name: "",
    email: "",
    phoneNumber: "",
    role: "T",
    password: "",
    confirmPassword: "",
    error: null
  };
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(InitialState);
  const [position, setPosition] = useState({});
  const history = useHistory();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (state.password !== state.confirmPassword)
      alert("The passwords don't match!");
    else {
      firebase
        .CreateUserWithEmailAndPassword(state.email, state.password)
        .then(credentials =>
          firebase.db
            .collection("users")
            .doc(credentials.user.id)
            .set({
              name: state.name,
              phoneNumber: state.phoneNumber,
              role: state.role,
              location: state.location,
              altitude: state.altitude
            })
        )
        .then(() => {
          const addRole = firebase.functions.httpsCallable("addRole");
          addRole({ email: state.email, role: state.role });
        })
        .then(() => {
          alert("Your Form Has Been Submitted!");
          setState(InitialState);
          history.push(ROUTES.HOME);
        })
        .catch(error => {
          setState({ ...state, error });
        });
    }
  };

  const handleLocationChange = ({ target }) => {
    let pos = target.value.split(",");
    if (pos.length === 2) {
      pos = pos.map(el => parseFloat(el));
      if (pos.filter(el => isNaN(el)).length === 0)
        setPosition({
          ...position,
          latitude: pos[0],
          longitude: pos[1]
        });
    }
  };

  const getGeoLocation = () => {
    GetGeoLocation(({ coords }) => {
      console.log(coords);
      setPosition(coords);
    }, true);
  };

  return (
    <>
      {state.error && <Alert variant="danger">{state.error.message}</Alert>}
      <h3 className="text-center mt-2">Sign Up</h3>

      <Form method="post" className="form-signup" onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="eg: John Doe"
            value={state.name}
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
            value={state.email}
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
            value={state.phoneNumber}
            minLength="8"
            maxLength="10"
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Please enter number without country code but enter region code for
            landlines
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formUserType">
          <Form.Label>User Type</Form.Label>
          <Form.Control
            name="role"
            as="select"
            onChange={handleChange}
            selected={state.role}
          >
            <option value="T">Tourist</option>
            <option value="V">Volunteer</option>
            <option value="R">Rescue Team</option>
            <option value="H">Health Post / Hospital</option>
          </Form.Control>
        </Form.Group>

        {state.role !== "T" && (
          <>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                onChange={handleLocationChange}
                // value={
                // position.updateLocation &&
                // `${position.latitude}, ${position.longitude}`
                // }
              />
              <Button onClick={getGeoLocation}>Get GeoLocation</Button>
            </Form.Group>
            {position.latitude && (
              <Maps location={[position.latitude, position.longitude]} />
            )}
          </>
        )}

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
            selected={state.password}
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
            selected={state.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          block
          disabled={state.password !== state.confirmPassword}
        >
          Submit
        </Button>

        <Form.Text className="text-center">
          Already Registered? <Link to={ROUTES.LOG_IN}>Log In</Link>
        </Form.Text>
      </Form>
    </>
  );
};

export default SignUpPage;
