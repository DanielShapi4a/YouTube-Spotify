import React, { useState } from 'react';
import axios from 'axios';

const YouTubeUrlParser = ({ onTitleReceived }) => {
  const [url, setUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);

  const handleParse = async () => {
    try {
      console.log("trying to fetch:", url);
      console.log("api:", process.env.REACT_APP_API_URL);
  
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/youtube`, {
        params: { url: url } 
      }); 
      const { data: videoDetails } = response; 
      console.log(videoDetails);
      if (videoDetails && videoDetails.title) {
        setVideoDetails(videoDetails);
        onTitleReceived(videoDetails.title);
      } else {
        alert('Failed to fetch video details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
      alert('Failed to fetch video details. Please try again.');
    }
  };
  
  

  return (
    <div>
      <h2>Paste YouTube URL</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleParse}>
            Parse URL
          </button>
        </div>
      </div>
      {videoDetails && (
        <div className='flex column'>
          <h3>Video Details</h3>
          <img src={videoDetails.thumbnails.medium.url} alt={videoDetails.title} />
          <p>{videoDetails.title}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeUrlParser;
