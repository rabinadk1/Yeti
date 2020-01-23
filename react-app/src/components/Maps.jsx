import React, { useState, createRef } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./Maps.css";

const Maps = ({ position, setPosition }) => {
  const [draggable, setDraggable] = useState(true);

  const refMarker = createRef();

  const toggleDraggable = () => {
    setDraggable(!draggable);
  };

  const updatePosition = () => {
    const marker = refMarker.current;
    if (marker) {
      const markerLoc = marker.leafletElement.getLatLng();
      setPosition({
        ...position,
        latitude: markerLoc.lat,
        longitude: markerLoc.lng
      });
    }
  };

  return (
    <Map center={[position.latitude, position.longitude]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        draggable={draggable}
        onDragend={updatePosition}
        position={[position.latitude, position.longitude]}
        ref={refMarker}
      >
        <Popup minWidth={90}>
          Your Current Location{" "}
          <span onClick={toggleDraggable}>
            {draggable ? "DRAG MARKER" : "MARKER FIXED"}
          </span>
        </Popup>
      </Marker>
    </Map>
  );
};

export default Maps;
