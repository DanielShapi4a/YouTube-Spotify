import React from 'react';

const MP3Download = () => {
  const handleDownload = () => {
    console.log('Downloading video in MP3 format...');
  };

  return (
    <button onClick={handleDownload} className="btn btn-outline-secondary m-3">
      Download MP3
    </button>
  );
};

export default MP3Download;
