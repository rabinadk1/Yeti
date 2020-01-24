import React from "react";
import Button from "react-bootstrap/Button";
import HelpButton from "./HelpButton";
import "./HelpButton.css";

const Tourist = ({ authUser }) => {
  return (
    <div>
      {authUser && authUser.tourist ? (
        <div>
          <HelpButton />
          <Button variant="outline-success" size="lg" block>
            Hospitals Near me
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tourist;
