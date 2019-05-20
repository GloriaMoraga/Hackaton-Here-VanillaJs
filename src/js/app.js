const mapContainer = document.getElementById('map-container');

const platform = new H.service.Platform({
  app_id: 'GkUohGm3fVKilW9qMHcb', // // <-- Gloria APP ID HERE
  app_code: 'TXWMDz0kPxL0ZkRWCj-u5w', // <-- Gloria APP CODE HERE
  // Only necessary if served over HTTPS:
  useHTTPS: true
});

const HEREHQcoordinates = {
  // HERE HQ in Berlin, Germany:
  lat: 52.530974,
  lng: 13.384944
};

// Displaying the map
const mapOptions = {
  center: HEREHQcoordinates,
  zoom: 14
};

const defaultLayers = platform.createDefaultLayers();

const map = new H.Map(
  mapContainer,
  defaultLayers.normal.map,
  mapOptions);

// Resize the map when the window is resized
window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

// Basic behavior: Zooming and panning
let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// User location via browser's geolocation API
function updatePosition (event) {
  let coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Add a new marker every time the position changes
  const marker = new H.map.Marker(coordinates);
  map.addObject(marker);
  // Recenter the map every time the position chnages
  map.setCenter(coordinates);
}

navigator.geolocation.watchPosition(updatePosition);