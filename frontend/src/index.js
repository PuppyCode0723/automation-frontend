import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HelloTitle from './HelloTitle';
import SpeechRecognitionApp from './SpeechRecognitionApp';
import Text2SpeechApp from './Text2SpeechApp';
import { Card } from 'primereact/card'
import { Menu } from './Menu'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Card>
      {/* <Text2SpeechApp /> */}
      {/* <SpeechRecognitionApp /> */}
      <App />
      <Menu />
    </Card>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
