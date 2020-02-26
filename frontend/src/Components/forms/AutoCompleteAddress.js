import React, { useState, useEffect, useMemo, useRef } from "react";

import throttle from "../../utils/throttle";
import { Input } from "./index";

const GOOGLE_API_KEY = 'AIzaSyAKq30EizjABPHYvcIRWtlQ08yWtQFBNTg';
const GOOGLE_API_URL = 
  `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places,geometry`;

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function AutoCompleteAddress({ addressValue, handleChange, id, ...rest }) {
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);
  //const autocompleteService = useRef(null);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        GOOGLE_API_URL,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  const handleChangeSuggest = (event) => {
    handleChange(event);

    if (event.target.value.length > 0) {
      fetch({ input: event.target.value }, results => {
        setOptions(results || []);
      });
    }
  }

  const getCoords = (event) => {
    const address = event.target.value;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        
        const coords = {
          lng: longitude,
          lat: latitude
        }

        const target = `${rest.name}Coords`;
        handleChange(false, target, coords);
      }
    });
  }

  const fetch = useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    []
  );

  useEffect(() => {
    const script = document.getElementById('google-maps');

    script.addEventListener('load', () => {

      if (!autocompleteService.current && window.google) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }
  
      if (addressValue === "") {
        setOptions([]);
        return undefined;
      }

    })
  });

  useEffect(() => {
    if (options.length > 0) {
      const listAddresses = document.getElementById(id)
  
      listAddresses.innerHTML = "";
      options.forEach(function(address) {
        // Create a new <option> element.
        const suggest = document.createElement('option');
  
        suggest.value = address.description;
  
        // attach the option to the datalist element
        listAddresses.appendChild(suggest)
        
      });
    }
  }, [options, id])

  return (
    <>
      <Input
        value={addressValue}
        list={id}
        id={`input-${id}`}
        onBlur={(event) => getCoords(event)}
        onChange={handleChangeSuggest}
        {...rest}
      />
      <datalist id={id}></datalist>
    </>
  );
}

// name= value= handleChange= placeHolder= error= id=
