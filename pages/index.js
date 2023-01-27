import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useEffect, useState } from 'react';

const fs = require('fs');

const display_badge = false;

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Running.");
        event.preventDefault();
        callGenerateEndpoint();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };



  return (
    
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Drinking Game Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Turn your activity into rules for a game</h2>
          </div>
        </div>
        <div className="prompt-container">

          <textarea
            placeholder="what's your activity"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <a className={isGenerating ? "generate-button loading" : "generate-button"}
              onClick={callGenerateEndpoint}
              href="#">
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>The Rules</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}

        </div>
      </div>


      <div className={display_badge ? "badge-container grow" : "empty"}>
        
        <a
          href="https://github.com/KevinRPan/gpt3-site"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>play responsibly</p>
          </div>
        </a>
      </div>

    </div>


  );
};

export default Home;

