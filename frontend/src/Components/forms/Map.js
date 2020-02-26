import React, { useRef, useEffect } from 'react';

// constant values to estimate time to finish order
const DRIVER_TIME_TO_PICKUP_ADDRESS = 3; //min
const DRIVER_MAX_TIME_WAITING_ORDER = 15; //min
const DRIVER_MIN_SPEED = 20; //km
const ONE_HOUR = 60; //min

const currentUserPosition = (createMap, mapRef) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      mapRef.current = createMap(userLocation);
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

export default ({ pickupLocation, destinationLocation, handleChange }) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  const createGoogleMap = (userLocation) =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 12,
      center: {
        lat: userLocation.lat,
        lng: userLocation.lng,
      }
    });

  const createMarker = (location, icon) => {
    const iconPath = `/img/request/${icon}`;

    const mark = new window.google.maps.Marker({
      setVisible: false,
      position: {
        lat: location.lat,
        lng: location.lng,
      },
      map: googleMap.current,
      draggable: true,
      icon: iconPath
    });
    return mark;
  }

  const getDistance = (a, b, cb) => {
    if ((a.lat && a.lng) && (b.lat && b.lng)) {

      const request = {
        origin: a,
        destination: b,
        travelMode: "DRIVING"
      };

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(request, function(result, status) {
        if (status === "OK") {
          const distance = result.routes[0].legs[0].distance.value / 1000; // to km
          cb(distance);
        }
      });
    }
  }

  const getEstimatedTime = (distance) => {
    const pickupToDeliveryTime = ((distance * ONE_HOUR) / DRIVER_MIN_SPEED); // time between pickup address and delivery address
    const estimatedTime = pickupToDeliveryTime + DRIVER_TIME_TO_PICKUP_ADDRESS + DRIVER_MAX_TIME_WAITING_ORDER;
    handleChange(false, 'estimatedTime', estimatedTime);
  }

  useEffect(() => {
    const googleMapScript = document.getElementById('google-maps');

    googleMapScript.addEventListener('load', () => {
      if (googleMapRef.current)
        currentUserPosition(createGoogleMap, googleMap);
    })

    if (pickupLocation.lng && pickupLocation.lat) {
      if (startMarker.current)
        startMarker.current.setMap(null);
      startMarker.current = createMarker(pickupLocation, "start.png");
    }
    if(destinationLocation.lng && destinationLocation.lat) {
      if (endMarker.current)
        endMarker.current.setMap(null);
      endMarker.current = createMarker(destinationLocation, "finish.png");
    }
  })

  useEffect(() => {
    getDistance(pickupLocation, destinationLocation, getEstimatedTime);
  }, [pickupLocation, destinationLocation])

  return (
    <div>
      <div id="google-map" ref={googleMapRef} style={{ width: "auto", height: "400px" }} />
    </div>
  )
}
