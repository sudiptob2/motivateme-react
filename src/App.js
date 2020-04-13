import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Speech from "react-speech";
import soundfile from "./audio.mp3";
import images from "./helper";

const App = () => {
    const [advice, setAdvice] = useState(
        "Quality is not an act, it is a habit"
    );
    const [doPlay, setDoPlay] = useState(false);
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
                console.log(advice.length);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        console.log("component did mount");
        setRandomBackGround();
        let fetchId = setInterval(fetchAdvice, 200 * advice.length);
        console.log(fetchId);
    }, []);

    return (
        <div
            className="app"
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
            }}
        >
            {doPlay && <audio src={soundfile} autoPlay />}
            <div className="card">
                <h1 className="header">{advice}</h1>
                <Speech
                    textAsButton={true}
                    displayText="Narrate"
                    text={advice}
                />
                <button onClick={playMusic}>
                    {doPlay ? "Pause Music" : "Play Music"}
                </button>{" "}
                <button onClick={setRandomBackGround}>Change Image</button>
            </div>
        </div>
    );
};

export default App;
