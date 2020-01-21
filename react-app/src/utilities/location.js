function GetGeoLocation(
  successCallback,
  enableHighAccuracy = false,
  maximumAge = 60 * 1000,
  timeout = 10 * 1000,
  verbose = false
) {
  if (typeof successCallback !== "function") {
    console.log("Please provide a callback function as the first argument");
    return -1;
  }

  const getPositionError = error => {
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
  };

  const positionOptions = {
    maximumAge: maximumAge, // cached for 1 minute, default: 0
    timeout: timeout, //timeout after 10 seconds, default: never
    enableHighAccuracy: enableHighAccuracy // for more accurate location, default: false
  };

  // check for Geolocation support
  if ("geolocation" in navigator) {
    if (verbose) console.log("Geolocation is supported!");
    navigator.geolocation.getCurrentPosition(
      successCallback,
      getPositionError,
      positionOptions
    );
    return 0;
  } else if (verbose)
    console.log("Geolocation is not supported for this Browser/OS.");
  return -1;
}

export default GetGeoLocation;
