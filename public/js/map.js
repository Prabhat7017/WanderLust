maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // container id
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new maptilersdk.Marker({
  color: "red",
})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new maptilersdk.Popup({offset: 25})
  .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking </p>`))
  .addTo(map);
