import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import formatRelative from "date-fns/formatRelative";
import { Button, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import SpeechRecognitionApp from './SpeechRecognitionApp';
import Text2SpeechApp from './Text2SpeechApp';

import CustCalendar from './CustCalendar';


const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "86vh",
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyCZzCuNYXL8j3HJyUeGmifwL66DvudzSlk",
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
    {}
    // {
    //   "start": '2022-01-08',
    //   "end": '2022-01-08',
    //   "title": "進廠維修",
    //   "description": "仁愛路192號",
    //   "content": "維修進場",
    //   "textColor": "red",
    //   "allDay": true,
    //   "backgroundColor": "white",
    // }
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

  const speechRecognitionOnClick = React.useCallback((event) => {
    setShowList([
      {
        description: "維修進場Desc",
        end: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
        start: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
        title: "進廠維修",
      } 
    ]);
    console.log("markers", markers)
    if (markers.length === 0) {
      setMarkers([
        {
          time: new Date(new Date().getTime()),
          lat: defaultPosition.lat + (Math.random() - 0.5) * 0.02,
          lng: defaultPosition.lng + (Math.random() - 0.5) * 0.03,
        },
        {
          time: new Date(new Date().getTime() + 1000),
          lat: defaultPosition.lat + (Math.random() - 0.5) * 0.02,
          lng: defaultPosition.lng + (Math.random() - 0.5) * 0.03,
        },
        {
          time: new Date(new Date().getTime() + 2000),
          lat: defaultPosition.lat + (Math.random() - 0.5) * 0.02,
          lng: defaultPosition.lng + (Math.random() - 0.5) * 0.03,
        },
        {
          time: new Date(new Date().getTime() + 3000),
          lat: defaultPosition.lat + (Math.random() - 0.5) * 0.02,
          lng: defaultPosition.lng + (Math.random() - 0.5) * 0.03,
        }
      ])
    } else {
      setMarkers(
      markers.map(x => {
        x.distance = Math.sqrt(Math.pow(x.lat - defaultPosition.lat, 2) + Math.pow(x.lng - defaultPosition.lng, 2))
        return x
      }))
      let nearestMarker = markers[0]; 
      markers.forEach(marker => {
        if (marker.distance < nearestMarker.distance) {
          nearestMarker = marker;
        }
      })
      setMarkers([nearestMarker]);
    }
  }, [defaultPosition, markers]);

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
      <Row>
        <Col>
          <Text2SpeechApp />
        </Col>
        <Col>
          <SpeechRecognitionApp onClick={speechRecognitionOnClick} />
        </Col>
      </Row>
      <div>
        <Row className="mx-2 my-3">
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
          <Button as={Col} variant="success" className="mx-2">Map</Button>
          <Button as={Col} variant="secondary" onClick={handleShow}>Calendar</Button>

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
    </div>
  )
}