chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_YOUTUBE_DETAILS') {
    const url = `${process.env.REACT_APP_API_URL}/youtube?url=${message.url}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, data });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // This indicates that the sendResponse function will be called asynchronously
  }
});

