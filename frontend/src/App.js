import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import formatRelative from "date-fns/formatRelative";
import { Button, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import CustCalendar from './CustCalendar';


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

  // 控制 Calendar 的開關
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Calendar event
  const [showList, setShowList] = useState([
    {
      // "start": new Date().getTime(),
      // "end": new Date().getTime(),
      // "title": "進廠維修",
      // "description": "仁愛路192號",
      // "content": "維修進場",
      // "textColor": "red",
      // "allDay": true,
      // "backgroundColor": "white",
    }
  ]);

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
    <div>
      <Row className="mx-0">
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
        <Button as={Col} variant="primary">Home</Button>
        <Button as={Col} variant="secondary" onClick={handleShow} className="mx-2">Calendar</Button>
        <Button as={Col} variant="success">Event</Button>

        <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>Calendar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CustCalendar strokslist={showList} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Row>
    </div>
  )
}