import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Card, Row } from "react-bootstrap";
import * as ROUTES from "../constants/routes";

const Volunteer = () => {
  return (
    <div>
      <Container
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Row
          style={{
            margin: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Link to={ROUTES.HOSPITAL_INFO}>
            <Button variant="outline-primary" size="lg">
              NearBy Hospitals
            </Button>
          </Link>
        </Row>
        <Row
          style={{
            margin: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button variant="outline-secondary" size="lg">
            Call for Help
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Volunteer;
