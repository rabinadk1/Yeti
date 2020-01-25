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

export default function MapShowingOther() {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);

  const [users, setUsers] = useState([]);
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
        switch (change.type) {
          case "added":
            const userData = change.doc.data();
            if (userData.role !== "T" || userData.toRescue)
              setUsers(u => [
                ...u,
                {
                  id: change.doc.id,
                  ...userData
                }
              ]);
            console.log("Added", change.doc.id, userData);
            break;

          // For change.type === "removed"
          default:
            setUsers(u => u.filter(el => el.id !== change.doc.id));
            console.log("Removed", change.doc.id, change.doc.data());
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
    <Map center={currentLocation} zoom={8} id="mapShowingOther">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map(user => (
        <Marker
          key={user.id}
          position={[user.latitude, user.longitude]}
          icon={user.role === "T" ? blue_marker : red_marker}
        >
          <Popup minWidth={90}>
            <div>
              <h2>{user.name}</h2>
              <p>
                {userMap[user.role]}
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
