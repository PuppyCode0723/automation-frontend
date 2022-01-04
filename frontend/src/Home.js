import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';
import SpeechRecognitionApp from './SpeechRecognitionApp';
import Text2SpeechApp from './Text2SpeechApp';

import React, { useState } from 'react';

export const Home = () => {



    return (
        <div>
            <Text2SpeechApp />,
            <SpeechRecognitionApp />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);