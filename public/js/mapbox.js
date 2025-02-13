/* eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5hc2VsbWFjaHRpIiwiYSI6ImNtNzI3eHBzczA3c3MydnNpZzJzcnFoZzgifQ._yVHjVBC-SvsqKjijV8X9g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anaselmachti/cm72a4m0901ol01s2fgei9qx7',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
