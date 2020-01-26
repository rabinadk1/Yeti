import React, { useEffect } from "react";
import Announcement from "react-announcement";
import * as ROUTES from "../constants/routes";

const RescueAnnouncement = ({ needingHelp, setNeedingHelp }) => {
  useEffect(() => {
    setNeedingHelp({ helpNeeded: false });
  }, [setNeedingHelp]);

  return (
    <Announcement
      title="Tourist Asking For Help"
      subtitle={`${needingHelp.name} is asking for help in ${needingHelp.latitude}, ${needingHelp.longitude}. Contact at ${needingHelp.phoneNumber}`}
      link={ROUTES.SEE_OTHER}
    />
  );
};

export default RescueAnnouncement;
