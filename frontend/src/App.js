import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import formatRelative from "date-fns/formatRelative";


const libraries = ["places"];
const mapContainerStyle = {
  width: "auto",
  height: "600px",
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDx6gVihoHMV06njE02Yj_d5Zkas2UXrKs',
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [defaultPosition, setDefaultPosition] = React.useState({ lat: null, lng: null });

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [...current,
    {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude + " " + pos.coords.longitude);
        const newUserPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setDefaultPosition(newUserPos);
      }, (err) => {
        console.log(err);
      },
        options
      )
    };
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={defaultPosition}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
        />))}
    </GoogleMap>
  )
}