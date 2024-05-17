chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.sendNativeMessage('YouTube-Spotify-Extension', { action: 'start-backend' });
});
