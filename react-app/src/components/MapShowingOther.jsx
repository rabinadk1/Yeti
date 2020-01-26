import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "./Firebase";
import SessionContext from "./SessionContext";
import GetGeoLocation from "../utilities/location";
import Announcement from "./Announcement";
import "./Maps.css";

const userMap = {
  H: "Health Post",
  V: "Volunteers",
  R: "Rescue Team",
  T: "Tourist"
};

// For Non-Tourists
const red_marker = new Icon({
  iconUrl: require("../images/red_marker.png"),
  iconSize: [35, 35]
});

// For Tourists
const blue_marker = new Icon({
  iconUrl: require("../images/blue_marker.png"),
  iconSize: [25, 40]
});

const current_marker = new Icon({
  iconUrl: require("../images/current_marker.png"),
  iconSize: [45, 45]
});

export default function MapShowingOther() {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);

  const [users, setUsers] = useState([]);
  const [needingHelp, setNeedingHelp] = useState({
    latitude: 27.7,
    longitude: 85.4,
    helpNeeded: false
  });

  const firebase = useContext(FirebaseContext);

  const [currentLocation, setCurrentLocation] = useState([27.68214, 85.32392]);

  useEffect(() => {
    GetGeoLocation(({ coords }) => {
      setCurrentLocation([coords.latitude, coords.longitude]);
    });
  }, []);

  useEffect(() => {
    firebase.UsersRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const userData = change.doc.data();
        const userId = change.doc.id;
        switch (change.type) {
          case "modified":
            setNeedingHelp({
              ...userData,
              helpNeeded: true
            });
          case "added":
            if (userData.role !== "T" || userData.toRescue)
              setUsers(u => [
                ...u,
                {
                  id: userId,
                  ...userData
                }
              ]);
            console.log(change.type, userId, userData);
            break;
          // For change.type === "removed"
          default:
            setUsers(u => u.filter(el => el.id !== userId));
            console.log("Removed", userId, userData);
        }
      });
    });
    // firebase
    //   .GetTourists()
    //   .then(querySnapshot => {
    //     const docs = [];
    //     querySnapshot.forEach(doc => {
    //       docs.push({ ...doc.data(), id: doc.id });
    //     });
    //     setTourists(docs);
    //   })
    //   .catch(err => {
    //     console.log("Error getting tourists: ", err);
    //   });
    // firebase
    //   .GetNonTourists()
    //   .then(querySnapshot => {
    //     const docs = [];
    //     querySnapshot.forEach(doc => {
    //       docs.push({ ...doc.data(), id: doc.id });
    //     });
    //     setNonTourists(docs);
    //   })
    //   .catch(err => {
    //     console.log("Error getting non-tourists: ", err);
    //   });
  }, [firebase.UsersRef]);

  return (
    <Map center={currentLocation} zoom={12} id="mapShowingOther">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {needingHelp.helpNeeded && (
        <Announcement
          needingHelp={needingHelp}
          setNeedingHelp={setNeedingHelp}
        />
      )}

      <Marker position={currentLocation} icon={current_marker}>
        <Popup>
          <h6>Your Location</h6>
        </Popup>
      </Marker>

      {users.map(user => (
        <Marker
          key={user.id}
          position={[user.latitude, user.longitude]}
          icon={user.role === "T" ? blue_marker : red_marker}
        >
          <Popup>
            <div>
              <h5>{user.name}</h5>
              <p>
                {userMap[user.role]}
                <br />
                {user.role === "T" && <strong>Asking For Help</strong>}
                <br />
                <a href={`tel:${user.phoneNumber}`}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  {user.phoneNumber}
                </a>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}
