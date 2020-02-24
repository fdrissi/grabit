import React, { useEffect, useState } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyAKq30EizjABPHYvcIRWtlQ08yWtQFBNTg';

export const AutoCompleteAddress = () => {
  const [address, setAddress] = useState('');
  const [load, setLoad] = useState(false);

  const input = document.getElementById('autocomplete');
  let autoComplete;

  const loadAddresses = () => {
    console.log("fired")
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
    }
    autoComplete = new window.google.maps.places.Autocomplete(input, options);

    window.google.maps.event.addListener(autoComplete, 'place_changed', function(){
      console.log('listen')
      const place = autoComplete.getPlace();
      console.log(place);
    })
  }
  
  useEffect (() => {
    const googlePlaces = document.createElement('script');

    googlePlaces.src = 
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&sensor=false&libraries=places&language=fr`
    
    window.document.body.appendChild(googlePlaces);
    googlePlaces.addEventListener('load', () => {
      loadAddresses();
      setLoad(true);
    })
  }, [])

  useEffect(() => {
    if (load) {
      const place = autoComplete.getPlace();
    console.log(place);
    }
    
  }, [address])

  return (
    <div>
      <input type="text" name="autocomplete" value={address} onChange={(event) => setAddress(event.target.value)} />
    </div>
  )
}
