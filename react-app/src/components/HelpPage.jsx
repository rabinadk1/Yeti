import React from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import * as ROUTES from "../constants/routes";
import HelpButton from "./HelpButton";
import "./HelpButton.css";

const Tourist = () => {
  const history = useHistory();
  return (
    <div>
      <HelpButton />
      <Button
        variant="outline-success"
        size="lg"
        block
        onClick={() => history.push(ROUTES.SEE_OTHER)}
      >
        Hospitals Near me
      </Button>
    </div>
  );
};

export default Tourist;
