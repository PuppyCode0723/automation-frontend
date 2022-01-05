import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react/cjs/react.development';

// const ENDPOINT = "http://127.0.0.1:5000";
const ENDPOINT = "https://automation-backend-server.herokuapp.com/";

function SpeechRecognitionApp() {
    const [message, setMessage] = useState('');
    const [prevMessage, setPrevmessage] = useState('');

    // 如果講的句子中有符合command的pattern，則呼叫callback函數將想要輸出的文字輸出到message
    const commands = [
        {
            command: 'I would like to order *',
            callback: (food) => setMessage(`Your order is for: ${food}`)
        }, {
            command: 'The weather is :condition today',
            callback: (condition) => setMessage(`Today, the weather is ${condition}`)
        }, {
            command: 'Hello Sam',
            callback: (n) => setMessage(`Your name is ${n}`)
        }
    ]

    const {
        transcript, listening, finalTranscript, resetTranscript, browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Browser doesn't support speech recognition.</span>
        } else {
            if (transcript !== '') {
                // 指定是否要持續監聽使用者是否有講話
                // SpeechRecognition.startListening({ continuous: false });

                console.log("transcript: " + transcript);

                // PUT data to server
                setTimeout(() => {
                    // if listening is false => 使用者講完後才會把資料傳到後端進行判斷
                    if (!listening) {
                        fetch(ENDPOINT + "/connection", {
                            method: 'PUT',
                            body: JSON.stringify({ data: transcript }),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        }).then(res => res.json())
                            .catch(error => console.error('Error: ', error))
                            .then(resetTranscript())
                            .then(response => console.log('Success: ', response));
                    }
                }, 3000);

                // 重置transcript
                // resetTranscript();
            }
        }
    }, [transcript])

    const getUserInput = () => {
        SpeechRecognition.startListening();
        console.log("回答是: " + transcript);
    }


    return (
        <div>

            <p hidden={true}>SpeechRecognitionApp</p>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={getUserInput}> Start </button>
            <button onClick={() => SpeechRecognition.stopListening()}> Stop </button>
            <button hidden={true} onClick={() => resetTranscript()} hidden={listening ? '' : 'hidden'}> Reset </button>
            <p>{transcript}</p>
        </div>
    );
}

export default SpeechRecognitionApp;

