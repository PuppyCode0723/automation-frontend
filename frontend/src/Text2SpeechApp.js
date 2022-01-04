// import { render } from '@testing-library/react';
import React from 'react';
import { Component } from 'react/cjs/react.development';
import CustCalendar from './CustCalendar';

// import Speech from 'react-speech';


const ENDPOINT = "http://127.0.0.1:5000";
// const ENDPOINT = "https://automation-backend-server.herokuapp.com/";

class Text2SpeechApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            lang: props.lang || "zh-TW",
            text:
                "Test message",
            prevText:
                "",
            autoPlay: false,
            isSpeaking: false,
            strokslist: [
                {
                    // "start": new Date().getTime(),
                    // "end": new Date().getTime(),
                    // "title": "進廠維修",
                    // "description": "仁愛路192號",
                    // "content": "維修進場",                    
                    // "textColor":"red",
                    // "allDay":true,
                    // "backgroundColor":"white",                    
                }
            ],
        };

        this.getData = this.getData.bind(this);
    }


    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        if (this.state.text !== this.state.prevText) {
            console.log("Previous text: " + this.state.prevText);
            console.log("Current text: " + this.state.text);
            this.setState({ prevText: this.state.text });
            this.speak();
        }
    }

    componentWillUnmount() {
        window.speechSynthesis.cancel();
    }

    // 車子自主檢查
    inspection = () => {
        console.log("車子開始自主檢查.....");
        // Get data from server every 2 sec
        setInterval(() => {
            fetch(ENDPOINT + "/connection")
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData['data']);
                    this.setState({ text: responseData['data'] });
                    if (responseData['date'] != null && responseData['date'] != undefined) {
                        this.setState(prevState => ({ strokslist: [...prevState.strokslist, responseData['date']] }))
                        console.log(responseData['date']);
                        console.log(this.state.strokslist);
                    }


                })
                .catch((error) => {
                    console.error(error);
                });
        }, 10000);
    }


    speak = () => {
        this._speech = new SpeechSynthesisUtterance();
        this._speech.onend = () => this.setState({ isSpeaking: false });

        // 載入語音包完畢後使用此方法
        let voices = window.speechSynthesis.getVoices();
        if (voices.length !== 0) {
            for (let index = 0; index < voices.length; index++) {
                if (voices[index].name === "Google 國語（臺灣）") { //Chrome專用
                    this._speech.voice = voices[index];
                    break;
                } else if (voices[index].name === "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)") {  //HsiaoChen (Neural) - 曉臻 (MS Edge專用)
                    this._speech.voice = voices[index];
                    break;
                }
            }

            this._speech.text = this.state.text;
            this._speech.lang = this.state.lang;
            this.setState({ isSpeaking: true });

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(this._speech);
        }

        // 第一次載入時載入語音包後才開始說話
        window.speechSynthesis.onvoiceschanged = () => {
            let voices = window.speechSynthesis.getVoices();
            for (let index = 0; index < voices.length; index++) {
                if (voices[index].name === "Google 國語（臺灣）") { //Chrome專用
                    this._speech.voice = voices[index];
                    break;
                } else if (voices[index].name === "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)") {  //HsiaoChen (Neural) - 曉臻 (MS Edge專用)
                    this._speech.voice = voices[index];
                    break;
                }
            }

            this._speech.text = this.state.text;
            this._speech.lang = this.state.lang;
            this.setState({ isSpeaking: true });

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(this._speech);
        }
    };

    stop = () => {
        window.speechSynthesis.cancel();
    };

    handleTextChange = e => {
        this.setState({ text: e.target.value });
    };

    getData() {
        console.log("getData function ");

        // Get data from server
        fetch(ENDPOINT + "/data")
            .then((response) => {
                return response.text();
            })
            .then((responseData) => {
                this.setState({ text: responseData });
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render() {
        return (
            <div>
                {/* <CustCalendar strokslist={this.state.strokslist} /> */}
                <div>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleTextChange}
                        cols="40"
                        rows="2"
                    />
                    <br />
                    <button disabled={this.state.isSpeaking} onClick={this.inspection}>
                        車子自主檢查
                    </button>
                    <button disabled={this.state.isSpeaking} onClick={this.speak}>
                        Text speak
                    </button>
                    <button disabled={!this.state.isSpeaking} onClick={this.stop}>
                        Text stop
                    </button>
                    <button hidden={true} onClick={this.getData}>
                        Get data from server
                    </button>
                </div>
            </div>
        )
    }
}


export default Text2SpeechApp;