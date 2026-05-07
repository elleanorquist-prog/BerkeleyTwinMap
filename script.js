mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsZWFub3JxdWlzdCIsImEiOiJjbWg5Y2E5OHowb3N3Mm1vb3lmempjZTcwIn0.MwBSyLdfa9fpSkUUKeBTuA';


const map = new mapboxgl.Map({
  container: 'map', // this is the container ID that we set in the HTML
  style: 'mapbox://styles/elleanorquist/cmot44gen004u01sp2wngfzt0',
  center: [-122.30, 37.88], // starting position [lng, lat]. Note that lat must be set between -90 and 90. You can choose what you'd like.
  zoom: 12 // starting zoom, again you can choose the level you'd like.
});

map.on('mouseover', function () {
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/elleanorquist-prog/Berkeleytwindata/refs/heads/main/data/unbrokengeojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#000000',
      'circle-radius': 3,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  });
 map.on('click', 'points-layer', (e) => {
const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;
   
   const popupContent = `
            <div>
               
                <h> ${properties.Minor_description}</h>
                <p>${properties.Twine_link}</p>
                <p2>${properties.Twine_link_W}</p2>
                 
            </div>
        `;
   new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });
// 1. Get the element and set initial state (optional, but good practice)
const myElement = document.getElementById('intro');
myElement.style.transition = 'opacity 15s ease-in-out'; // Smooth transition
myElement.style.opacity = 1; // Starts visible

// 2. Listen for map movement
map.on('move', function() {
    // When the map moves, decrease opacity (fade out)
    myElement.style.opacity = 0;
  
});
});
