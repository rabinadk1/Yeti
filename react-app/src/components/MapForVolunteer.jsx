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

// For Tourists
const blue_marker = new Icon({
  iconUrl: require("../images/blue_marker.png"),
  iconSize: [25, 40]
});

const current_marker = new Icon({
  iconUrl: require("../images/current_marker.png"),
  iconSize: [45, 45]
});

export default function MapForVolunteer() {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);

  const [tourists, setTourists] = useState([]);
  const firebase = useContext(FirebaseContext);

  const [currentLocation, setCurrentLocation] = useState([27.68214, 85.32392]);

  useEffect(() => {
    GetGeoLocation(({ coords }) => {
      setCurrentLocation([coords.latitude, coords.longitude]);
    });
  }, []);

  useEffect(() => {
    firebase
      .GetTourists()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          if (userData.role !== "T" || userData.toRescue)
            docs.push({ ...userData, id: doc.id });
        });
        setTourists(docs);
      })
      .catch(err => {
        console.log("Error getting tourists: ", err);
      });
  }, [firebase]);

  return (
    <Map center={currentLocation} zoom={12} id="mapShowingOther">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={currentLocation} icon={current_marker}>
        <Popup>
          <h6>Your Location</h6>
        </Popup>
      </Marker>

      {tourists.map(user => (
        <Marker
          key={user.id}
          position={[user.latitude, user.longitude]}
          icon={blue_marker}
        >
          <Popup>
            <div>
              <h5>{user.name}</h5>
              <p>
                Tourist
                <br />
                <strong>Asking For Help</strong>
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
