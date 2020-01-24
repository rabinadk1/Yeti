import React from "react";
import Button from "react-bootstrap/Button";
import HelpButton from "./HelpButton";
import "./HelpButton.css";

const Volunteer = () => {
  return (
    <div>
      <HelpButton />
      <Button variant="outline-success" size="lg" block>
        Hospitals Near me
      </Button>
    </div>
  );
};

export default Volunteer;
