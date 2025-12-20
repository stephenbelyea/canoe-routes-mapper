const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const startCoords = [47.29881487749173, -80.19848779265314];
const startZoom = 13;
const maxZoom = 19;

const tentSize = 18;
const tentProps = {
  iconUrl: "icons/tent.svg",
  iconSize: [tentSize, tentSize],
  iconAnchor: [tentSize * 0.5, tentSize * 0.85],
  popupAnchor: [0, tentSize * -0.75],
};

const sites = [
  { title: "Site 101", coords: [47.29105491227899, -80.20710534413388] },
  { title: "Site 102", coords: [47.27789063180173, -80.20517496883544] },
  { title: "Site 103", coords: [47.27573510566949, -80.21392600352175] },
  { title: "Site 104", coords: [47.29089456440832, -80.19797302590689] },
  { title: "Site 105", coords: [47.29951367169243, -80.18819245772806] },
];

window.onload = () => {
  const map = L.map("map", {
    center: startCoords,
    zoom: startZoom,
  });

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    console.log([lat, lng]);
  });

  L.tileLayer(tileLayer, {
    maxZoom,
    attribution,
  }).addTo(map);

  var tent = L.icon(tentProps);
  sites.forEach((site) => {
    L.marker(site.coords, { icon: tent }).addTo(map).bindPopup(site.title);
  });
};
