import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./Maps.css";

const Maps = ({ location }) => {
  return (
    <Map center={location} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location}>
        <Popup>Your Current Location</Popup>
      </Marker>
    </Map>
  );
};

export default Maps;
