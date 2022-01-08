import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HelloTitle from './HelloTitle';
import SpeechRecognitionApp from './SpeechRecognitionApp';
import Text2SpeechApp from './Text2SpeechApp';

import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <HelloTitle />, */}
    <Row>
      <Col>
        <Text2SpeechApp />,
      </Col>
      <Col>
        <SpeechRecognitionApp />,
      </Col>
    </Row>
    <App />,


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
