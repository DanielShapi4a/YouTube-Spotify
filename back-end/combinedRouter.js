const express = require('express');
const axios = require('axios');
const cors = require('cors');

const router = express.Router();
router.use(cors());
router.use(express.json()); 

require('dotenv').config();

// YouTube route
router.get('/youtube', async (req, res) => {
    try {
        const { url } = req.body; 
        const videoId = extractVideoId(url);
        if (!videoId) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`);
        const { data } = response;
        if (data && data.items && data.items.length > 0) {
            const videoDetails = data.items[0].snippet;
            return res.json(videoDetails);
        } else {
            return res.status(404).json({ error: 'No video details found' });
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Spotify route
router.post('/spotify', async (req, res) => {
    try {
        console.log("in spotify-back-end");
        const { query } = req.body; 
        const bearerToken = await fetchBearerToken();

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${process.env.NUMBER_RESPONSE}`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const { data } = response;
        if (data && data.tracks && data.tracks.items && data.tracks.items.length > 0) {
            const tracks = data.tracks.items.map(item => ({
                id: item.id,
                title: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                thumbnail: item.album.images[0].url
            }));
            return res.json(tracks);
        } else {
            return res.status(404).json({ error: 'No tracks found' });
        }
    } catch (error) {
        console.error('Error searching Spotify:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Function to fetch bearer token
const fetchBearerToken = async () => {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching bearer token:', error);
        throw error; 
    }
};

module.exports = router;

const extractVideoId = (url) => {
  const regex = /[?&]v=([^&#]+)/;
  const match = url.match(regex);
  return match && match[1];
};

module.exports = router;
