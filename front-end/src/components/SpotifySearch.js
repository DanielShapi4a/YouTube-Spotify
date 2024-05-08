import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyCard from './SpotifyCard';

const SpotifySearch = ({ initialSearchInput }) => {
  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSearchInput(initialSearchInput); // Update search input when prop changes
  }, [initialSearchInput]);

  const handleSearch = async () => {
    try {
      const data = { query: searchInput };
      console.log("trying to fetch spotify123:", data.query);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/spotify`, data);
      console.log(response);
      const { data: tracks } = response;
      if (tracks && tracks.length > 0) {
        setSongs(tracks);
      } else {
        setSongs([]);
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };
  

  return (
    <div>
      <h2>Search for Similar Songs on Spotify</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter song name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {songs.map((song) => (
          <SpotifyCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SpotifySearch;
