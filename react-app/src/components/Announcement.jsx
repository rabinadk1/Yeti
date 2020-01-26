import * as React from "react";
import Announcement from "react-announcement";

class Example extends React.Component {
  render() {
    return (
      <Announcement
        title="Here is your component"
        subtitle="The best announcement component for React is finally here. Install it in all your projects."
        link="https://github.com/kristofferandreasen/react-announcement"
      />
    );
  }
}

export default Example;
