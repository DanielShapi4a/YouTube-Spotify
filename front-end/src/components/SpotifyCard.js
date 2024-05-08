import React from 'react';

const SpotifyCard = ({ song }) => {
  const spotifyUrl = `https://open.spotify.com/track/${song.id}`;

  return (
    <div className="col-md-3 mb-3">
      <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
        <div className="card h-100">
          <img src={song.thumbnail} className="card-img-top" alt={song.title} />
          <div className="card-body">
            <h5 className="card-title" style={{fontWeight:"bold"}}>{song.title}</h5>
            <p className="card-text">Artist: {song.artist}</p>
            <p className="card-text">Album: {song.album}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SpotifyCard;
