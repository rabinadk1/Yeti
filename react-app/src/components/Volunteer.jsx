import React from "react";
import Button from "react-bootstrap/Button";

import "./HelpButton.css";

const Volunteer = ({ authUser }) => {
  if (authUser && !authUser.tourist) {
    return (
      <div>
        <Button variant="outline-success" size="lg" block>
          Anyone needs my help?
        </Button>
      </div>
    );
  }
  return <div></div>;
};

export default Volunteer;
