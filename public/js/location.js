window.onload = () => {
  // check for Geolocation support
  if ("geolocation" in navigator) {
    console.log("Geolocation is supported!");
    navigator.geolocation.getCurrentPosition(
      ({ coords, timestamp }) => {
        console.log(
          `The user was at (${coords.latitude}, ${
            coords.longitude
          }) at ${new Date(timestamp)}`
        );
        if (coords.altitude)
          console.log(`The user is at altitude ${coords.altitude}`);
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      },
      {
        maximumAge: 60 * 1000, // cached for 1 minute, default: 0
        timeout: 10 * 1000, //timeout after 10 seconds, default: never
        enableHighAccuracy: true // for more accurate location, default: false
      }
    );
  } else console.log("Geolocation is not supported for this Browser/OS.");
};
