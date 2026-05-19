export function loadGoogleMapsScript() {
  // Check if script is already loaded
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    // Fetch API key from backend
    fetch('/api/config')
      .then(res => res.json())
      .then(config => {
        const apiKey = config.googleMapsApiKey;
        
        if (!apiKey) {
          console.error('Google Maps API key not found');
          reject('No API key');
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Google Maps script loaded successfully');
          resolve(undefined);
        };
        
        script.onerror = () => {
          console.error('Failed to load Google Maps script');
          reject('Failed to load script');
        };
        
        document.head.appendChild(script);
      })
      .catch(error => {
        console.error('Failed to fetch API configuration:', error);
        reject(error);
      });
  });
}
