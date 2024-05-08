import React from 'react';

const MP4Download = () => {
  const handleDownload = () => {
    console.log('Downloading video in MP4 format...');
  };

  return (
    <button onClick={handleDownload} className="btn btn-outline-secondary m-3">
      Download MP4
    </button>
  );
};

export default MP4Download;
