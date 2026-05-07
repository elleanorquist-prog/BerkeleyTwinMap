mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxsZWFub3JxdWlzdCIsImEiOiJjbWg5Y2E5OHowb3N3Mm1vb3lmempjZTcwIn0.MwBSyLdfa9fpSkUUKeBTuA";

const map = new mapboxgl.Map({
  container: "map", // this is the container ID that we set in the HTML
  style: "mapbox://styles/elleanorquist/cmot44gen004u01sp2wngfzt0",
  center: [-122.3, 37.88], // starting position [lng, lat]. Note that lat must be set between -90 and 90. You can choose what you'd like.
  zoom: 11 // starting zoom, again you can choose the level you'd like.
});

map.on("mouseover", function () {
  map.addSource("points-data", {
    type: "geojson",
    data:
      "https://raw.githubusercontent.com/elleanorquist-prog/Berkeleytwindata/78d8b91fd83cb7de922533cb17b70f755894c55b/data/map%20(2).geojson"
  });

  map.addLayer({
    id: "points-layer",
    type: "circle",
    source: "points-data",
    paint: {
      "circle-color": "#000000",
      "circle-radius": 3,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#FFFFFF"
    }
  });
  map.on("click", "points-layer", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    const popupContent = `
            <div>
               
                <p> ${properties.Twinelink}</p>
                 
            </div>
        `;
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
  });
});
