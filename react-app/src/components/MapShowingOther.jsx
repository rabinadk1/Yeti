import React, { useState, useEffect, useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { FirebaseContext } from "./Firebase";
import "./Maps.css";

const nonTouristMap = { H: "Health Post", V: "Volunteers", R: "Rescue Team" };

// For Non-Tourists
const red_marker = new Icon({
  iconUrl: require("../images/red_marker.png"),
  iconSize: [25, 25]
});

// For Tourists
const blue_marker = new Icon({
  iconUrl: require("../images/blue_marker.png"),
  iconSize: [25, 40]
});

export default function MapShowingOther() {
  const [nonTourists, setNonTourists] = useState([]);

  const [tourists, setTourists] = useState([]);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .GetTourists()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setTourists(docs);
      })
      .catch(err => {
        console.log("Error getting tourists: ", err);
      });
    firebase
      .GetNonTourists()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNonTourists(docs);
      })
      .catch(err => {
        console.log("Error getting non-tourists: ", err);
      });
  }, [firebase]);

  const pos = [24, 86];

  return (
    <Map center={pos} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {tourists.map((tourist, index) => (
        <Marker
          key={tourist.id}
          position={[pos[0] + 0.1 * index, pos[1]]}
          icon={blue_marker}
        >
          <Popup minWidth={90}>
            <div>
              <h2>{tourist.name}</h2>
              <p>
                <a href={`tel:${tourist.phoneNumber}`}>
                  Call At: {tourist.phoneNumber}
                </a>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      {nonTourists.map((nonTourist, index) => (
        <Marker
          key={nonTourist.id}
          position={[pos[0] + 0.1 * index, pos[1]]}
          icon={red_marker}
        >
          <Popup minWidth={90}>
            <div>
              <h2>{nonTourist.name}</h2>
              <p>
                <strong>{nonTouristMap[nonTourist.role]}</strong>
                <a href={`tel:${nonTourist.phoneNumber}`}>
                  Call At: {nonTourist.phoneNumber}
                </a>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}
