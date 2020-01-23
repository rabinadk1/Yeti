import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./Maps.css";

// const currentLocation = [27.3333, 84];

const Maps = props => (
  <Map center={props.location} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={props.location}>
      <Popup isOpen={true}>Your Current Location</Popup>
    </Marker>
  </Map>
);

export default Maps;
