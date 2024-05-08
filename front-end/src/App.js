import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import YouTubeUrlParser from './components/YouTubeUrlParser';
import SpotifySearch from './components/SpotifySearch';
import MP3Download from './components/MP3Download';
import MP4Download from './components/MP4Download';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [spotifySearchInput, setSpotifySearchInput] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateSpotifySearchInput = (title) => {
    setSpotifySearchInput(title);
    console.log("Received title1:", title);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className="mt-4">YouTube to Spotify Converter</h1>
      <YouTubeUrlParser onTitleReceived={updateSpotifySearchInput} />
      <SpotifySearch initialSearchInput={spotifySearchInput} />
      <MP3Download />
      <MP4Download />
      <button onClick={toggleDarkMode} className="btn btn-outline-secondary m-3">
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default App;
