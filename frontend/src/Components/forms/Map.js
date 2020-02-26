import React, { useRef, useEffect } from 'react';

// constant value to estimate time to finish order
const DRIVER_TIME_TO_ARRIVE = 3; //;min
const DRIVER_MAX_TIME_TO_COLLECT = 15; //min
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

const getEstimatedTime = (distance) => {
  console.log(distance, ((distance * ONE_HOUR) / DRIVER_MIN_SPEED))
  const estimatedTime = ((distance * ONE_HOUR) / DRIVER_MIN_SPEED) + DRIVER_TIME_TO_ARRIVE + DRIVER_MAX_TIME_TO_COLLECT;
  return estimatedTime;
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

  const getDistance = (a, b) => {
    let distance = false;
    if ((a.lat && a.lng) && (b.lat && b.lng)) {
      const start = new window.google.maps.LatLng({lat: a.lat, lng: a.lng});
      const finish = new window.google.maps.LatLng({lat: b.lat, lng: b.lng});
      distance = window.google.maps.geometry.spherical.computeDistanceBetween(start, finish); 
    }
      
    return distance;
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
    const distance = Math.ceil(getDistance(pickupLocation, destinationLocation)) / 1000; //to km
    console.log(distance)
    const estimatedTime = Math.ceil(getEstimatedTime(distance));
    const data = {
      distance,
      estimatedTime
    };
    if (distance && estimatedTime)
      handleChange(false, 'distance', data);
    // if (estimatedTime)
    //   handleChange(false, 'estimatedTime', estimatedTime);
  }, [pickupLocation, destinationLocation])

  return (
    <div>
      <div id="google-map" ref={googleMapRef} style={{ width: "500px", height: "400px" }} />
    </div>
  )
}
