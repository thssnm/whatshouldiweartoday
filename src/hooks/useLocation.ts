import React from "react";

export const useLocation = () => {
  const [userLocation, setUserLocation] = React.useState<
    { latitude: number; longitude: number } | string
  >("Cologne");

  // define the function that finds the users geolocation
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation((old) => {
            console.log(old);
            return { latitude, longitude };
          });
        },
        // if there was an error getting the users location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return {
    getUserLocation,
    userLocation,
  };
};
