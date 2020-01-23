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
  const [formState, setFormState] = useState(InitialState);
  const [position, setPosition] = useState({});
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword)
      alert("The passwords don't match!");
    else {
      firebase
        .CreateUserWithEmailAndPassword(formState.email, formState.password)
        .then(credentials =>
          firebase.db
            .collection("users")
            .doc(credentials.user.uid)
            .set({
              name: formState.name,
              phoneNumber: formState.phoneNumber,
              role: formState.role,
              ...position
            })
        )
        .then(() => {
          const addRole = firebase.functions.httpsCallable("addRole");
          addRole({ email: formState.email, role: formState.role });
        })
        .then(() => {
          setFormState(InitialState);
          history.push(ROUTES.VOLUNTEER);
        })
        .catch(error => {
          setFormState({ ...formState, error });
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
      {formState.error && (
        <Alert variant="danger">{formState.error.message}</Alert>
      )}
      <h3 className="text-center mt-2">Sign Up</h3>

      <Form method="post" className="form-signup" onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="eg: John Doe"
            value={formState.name}
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
            value={formState.email}
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
            value={formState.phoneNumber}
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
            selected={formState.role}
          >
            <option value="T">Tourist</option>
            <option value="V">Volunteer</option>
            <option value="R">Rescue Team</option>
            <option value="H">Health Post / Hospital</option>
          </Form.Control>
        </Form.Group>

        {formState.role !== "T" && (
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
              <Maps position={position} setPosition={setPosition} />
            )}
          </>
        )}

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
            selected={formState.password}
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
            selected={formState.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          block
          disabled={formState.password !== formState.confirmPassword}
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
