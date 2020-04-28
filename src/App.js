import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import ReactTypingEffect from "react-typing-effect";
import soundfile from "./resources/audio.mp3";
import images from "./helper";

const App = () => {
    const [advice, setAdvice] = useState(
        "Quality is not an act, it is a habit"
    );
    const [doPlay, setDoPlay] = useState(false);
    const [doNarrate, setDoNarrate] = useState(false);
    const [backgroundImg, setBackgroundImg] = useState();

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const setRandomBackGround = () => {
        const id = getRndInteger(0, images.length - 1);
        setBackgroundImg(images[id]);
        console.log("New Backgroud: ", images[id]);
    };
    const playMusic = () => {
        setDoPlay(!doPlay);
    };

    const fetchAdvice = () => {
        axios
            .get("https://api.adviceslip.com/advice")
            .then((response) => {
                const { advice } = response.data.slip;

                setAdvice(advice);

                console.log("New Advice: ", advice);
                console.log("Fetch: Donarrante: ", doNarrate);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const auto = () => {
        var msg = new SpeechSynthesisUtterance(advice);
        window.speechSynthesis.speak(msg);
    };
    const handleAuto = () => {
        setDoNarrate(!doNarrate);
        if (!doNarrate) auto();
        console.log("Handleauto: Donarrate: ", doNarrate);
    };
    const handleSpeak = () => {
        var msg = new SpeechSynthesisUtterance(advice);
        window.speechSynthesis.speak(msg);
    };

    useEffect(() => {
        console.log("doNarrate ", doNarrate);
        if (doNarrate) {
            setTimeout(auto, 6000 + 2 * advice.length);
        }
    }, [advice]);

    useEffect(() => {
        console.log("component did mount");
        setRandomBackGround();
        setInterval(setRandomBackGround, 30000);
        setInterval(fetchAdvice, 6000 + 2 * advice.length);
    }, []);

    return (
        <div
            className="app"
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImg})`,
                transition: "4s",
            }}
        >
            {doPlay && <audio src={soundfile} loop autoPlay />}

            <div className="card">
                <h1 className="header">
                    <ReactTypingEffect
                        speed={50}
                        typingDelay={1000}
                        text={advice}
                    />
                </h1>
                <div className="text-center ">
                    <div className="btn-group flex-wrap">
                        <div style={{ margin: 1 }}>
                            <button
                                className="btn btn-light btn-play"
                                onClick={playMusic}
                            >
                                {doPlay ? "Pause Music" : "Play Music"}
                            </button>
                        </div>
                        <div style={{ margin: 1 }}>
                            <button
                                className="btn btn-light btn-img"
                                onClick={setRandomBackGround}
                            >
                                Change Image
                            </button>
                        </div>
                        <div style={{ margin: 1 }}>
                            <button
                                className="btn btn-light btn-narrate"
                                onClick={handleSpeak}
                                id="narrate"
                            >
                                Voice Over
                            </button>
                        </div>
                        <div style={{ margin: 1 }}>
                            <button
                                className="btn btn-secondary btn-auto"
                                onClick={handleAuto}
                                id="narrate"
                            >
                                {doNarrate ? "Stop Auto" : "Auto(beta)"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
