const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

GetGeoLocation(({ coords }) => {
  const curLoc = new L.LatLng(coords.latitude, coords.longitude);
  map.panTo(curLoc);
  L.marker(curLoc)
    .addTo(map)
    .bindPopup("Your Location")
    .openPopup();
}, true);
