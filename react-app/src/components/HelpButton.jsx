import React from "react";
import "./HelpButton.css";

const HelpButton = () => {
  const clickedButton = () => {
    console.log("Hello There");
  };

  return (
    <div className="sonar-wrapper">
      <div className="sonar-emitter" onClick={clickedButton}>
        <div className="sonar-wave"></div>
      </div>
    </div>
  );
};

export default HelpButton;
