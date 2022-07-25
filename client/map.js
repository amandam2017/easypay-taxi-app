let mapOptions = {
    center:[-33.92794,18.42359],
    zoom:10
}

let map = new L.map('map', mapOptions)

// let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© PowerPuff Coders',
    attributionControl: true,
}).addTo(map);
// adding map to a layer
map.addLayer(layer);

// ADDING MARKERS TO THE MAP
let stellies = [-33.9344, 18.8692]
let marker = L.marker([-33.92794,18.42359]).addTo(map);
let marker2 = L.marker(stellies).addTo(map);
let line = L.polyline( [[-33.92794,18.42359],[-33.9344, 18.8692]], {
    weight: 5,
    color: 'yellow'
  }).addTo(map)

//   layer.openPopup();

map.on('click', (e)=> {
    stellies = e.latlng
    marker2.remove()
    line.remove()
    marker2 = L.marker(stellies).addTo(map);
    line = L.polyline( [[-33.92794,18.42359],stellies], {
        weight: 5,
        color: 'yellow'
      }).addTo(map)
    console.log(e.latlng, '---------');
    
})

let circle = L.circle([-33.92794,18.42359], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

