import React, { useRef, useEffect, useState } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyAKq30EizjABPHYvcIRWtlQ08yWtQFBNTg';
const moroccoLocation = {
  lat: 31.794525,
  lng: -7.0849336,
}

export const Maps = ({ pickupLocation, setPickupLocation }) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);
  const mapEvent = useRef(null);
  let map;
  let markerInstance;

  const createGoogleMap = () =>
    map = new window.google.maps.Map(googleMapRef.current, {
      zoom: 6,
      center: {
        lat: moroccoLocation.lat,
        lng: moroccoLocation.lng,
      }
    });

  const createMarker = () => 
    markerInstance = new window.google.maps.Marker({
      setVisible: false,
      position: {
        lat: moroccoLocation.lat,
        lng: moroccoLocation.lng,
      },
      map: googleMap.current,
      draggable: true,
    });
    
  const getCoords = () =>
    new window.google.maps.event.addDomListener(map, 'click', (e) => {
      setPickupLocation({ ...pickupLocation, lat: e.latLng.lat(), lng: e.latLng.lng() })
      e.latLng.lat()
    })
  
  useEffect(() => {
    const googleMapScript = document.createElement('script');

    googleMapScript.src = 
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&librairies=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      googleMap.current = createGoogleMap();
      marker.current = createMarker();
      mapEvent.current = getCoords()
    })

    // const map = document.getElementById('google-map');
    // map.addEventListener('click', (event) => console.log(event))
  })

  return (
    <div>
      <div id="google-map" ref={googleMapRef} style={{ width: "100%", height: "400px" }} />
    </div>
    
  )
}
