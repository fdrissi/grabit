import React, { useRef, useEffect } from 'react';

// const moroccoLocation = {
//   lat: 31.794525,
//   lng: -7.0849336,
// }

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

export default ({ pickupLocation, destinationLocation }) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);

  const createGoogleMap = (userLocation) =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 6,
      center: {
        lat: userLocation.lat,
        lng: userLocation.lng,
      }
    });

  const createMarker = (location) => 
    new window.google.maps.Marker({
      setVisible: false,
      position: {
        lat: location.lat,
        lng: location.lng,
      },
      map: googleMap.current,
      draggable: true,
    });
  
  useEffect(() => {
    const googleMapScript = document.getElementById('google-maps');

    googleMapScript.addEventListener('load', () => {
      if (googleMapRef.current)
        currentUserPosition(createGoogleMap, googleMap);
    })

    if (pickupLocation.lng && pickupLocation.lat)
      marker.current = createMarker(pickupLocation);
    if(destinationLocation.lng && destinationLocation.lat)
      marker.current = createMarker(destinationLocation);
  })

  return (
    <div>
      <div id="google-map" ref={googleMapRef} style={{ width: "100%", height: "400px" }} />
    </div>
    
  )
}
