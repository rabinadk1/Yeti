import React from "react";
import Button from "react-bootstrap/Button";
import HelpButton from "./HelpButton";
import "./HelpButton.css";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const Tourist = ({ authUser }) => {
  const history = useHistory();
  return (
    <div>
      {authUser && authUser.tourist ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tourist;
