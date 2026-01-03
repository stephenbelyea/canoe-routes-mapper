const sites = [
  { title: "101", coords: [47.29105491227899, -80.20710534413388] },
  { title: "102", coords: [47.27789063180173, -80.20517496883544] },
  { title: "103", coords: [47.27573510566949, -80.21392600352175] },
  { title: "104", coords: [47.29089456440832, -80.19797302590689] },
  { title: "105", coords: [47.29951367169243, -80.18819245772806] },
  { title: "106", coords: [47.3265314326647, -80.2134069706026] },
  { title: "107", coords: [47.30941706666623, -80.2152944486722] },
  { title: "108", coords: [47.30231355943109, -80.17376993114107] },
  { title: "109", coords: [47.3037110461138, -80.17737329836486] },
  { title: "110", coords: [47.322806328410806, -80.16501889645475] },
  { title: "111", coords: [47.34550210567088, -80.17737329836486] },
  { title: "112", coords: [47.35646429601602, -80.19006680214441] },
  { title: "113", coords: [47.34994888609407, -80.21297392235272] },
  { title: "114", coords: [47.26037178011643, -80.20139574652335] },
  { title: "115", coords: [47.28157983540083, -80.24635204236284] },
  { title: "116", coords: [47.35717259931405, -80.21932749468449] },
  { title: "117", coords: [47.356416397793, -80.21864113902282] },
  { title: "118", coords: [47.36618801330525, -80.23785909754963] },
  { title: "119", coords: [47.36450137558582, -80.25784920619581] },
  { title: "120", coords: [47.34495570981918, -80.26814454112088] },
  { title: "121", coords: [47.356433751778674, -80.26060298003443] },
];

const routes = [
  {
    title: "101",
    length: 3.02,
    segments: [
      [47.35688896122005, -80.20920653522948],
      [47.346573033738245, -80.20825981984213],
      [47.335866715005636, -80.20894667578374],
      [47.32651587912744, -80.20439854363815],
    ],
  },
  {
    title: "102",
    length: 5.02,
    segments: [
      [47.32651587912744, -80.20439854363815],
      [47.312584618603786, -80.20963353172536],
      [47.30163848851424, -80.2072295359297],
      [47.29418450711346, -80.20173468839674],
      [47.28439956180773, -80.2068861079589],
      [47.27671012054221, -80.20173468839674],
    ],
  },
  {
    title: "103",
    length: 1.6,
    segments: [
      [47.27671012054221, -80.20173468839674],
      [47.268058188286744, -80.19848779265314],
      [47.260595007438376, -80.20260253904641],
    ],
  },
];

const tentSize = 18;
const tentProps = {
  iconUrl: "icons/tent.svg",
  iconSize: [tentSize, tentSize],
  iconAnchor: [tentSize * 0.5, tentSize * 0.85],
  popupAnchor: [0, tentSize * -0.75],
};

const dotProps = { radius: 50, color: "crimson" };

window.onload = () => {
  const map = L.map("map", {
    center: [47.31142334601749, -80.22010056868845],
    zoom: 12,
  });

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    console.log([lat, lng]);
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // Tent icon and position campsites
  const tent = L.icon(tentProps);
  sites.forEach((site) => {
    L.marker(site.coords, { icon: tent }).addTo(map).bindPopup(site.title);
  });

  // Route segments
  const path = [];
  routes.forEach((route, idx) => {
    const first = 0;
    const last = route.segments.length - 1;
    path.push(route.segments);
    L.circle(route.segments[first], dotProps).addTo(map);
    L.circle(route.segments[last], dotProps).addTo(map);
  });
  L.polyline(path, { color: "crimson", smoothFactor: 5 }).addTo(map);
};
