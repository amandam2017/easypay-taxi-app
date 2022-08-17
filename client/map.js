
// let mapOptions = {
//     center:[-33.92794,18.42359],
//     zoom:10,
    
// }


// let map = new L.map('map', mapOptions)
// For different locations



// let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
// let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© PowerPuff Coders',
//     attributionControl: true,
// }).addTo(map);
// // adding map to a layer
// map.addLayer(layer);

// ADDING MARKERS TO THE MAP
// let marker = L.marker({locations: [
//     'Kuilsriver, CPT',
//     'Stellenbosch, CPT',
  
//   options: { avoids: ['toll road', 'traffic'] },
// ]}).addTo(map);
// let stellies = [-33.9344, 18.8692]
// let marker = L.marker([-33.92794,18.42359], { avoids: ['toll road', 'traffic'], draggable: true }).addTo(map);
// let marker2 = L.marker(stellies).addTo(map);
// let line = L.polyline( [[-33.92794,18.42359],[-33.9344, 18.8692]], {
//     weight: 5,
//     color: 'yellow'
//   }).addTo(map)

//   layer.openPopup();

// map.on('click', (e)=> {
//     stellies = e.latlng
//     marker2.remove()
//     line.remove()
//     marker2 = L.marker(stellies).addTo(map);
//     line = L.polyline( [[-33.92794,18.42359],stellies], {
//         weight: 5,
//         color: 'yellow'
//       }).addTo(map)
//     console.log(e.latlng, '---------');
    
// })

// let circle = L.circle([-33.92794,18.42359], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// To pass data to the map from form

L.mapquest.key = 'gjidWmOak0m728S6K813JnY2Rxz7QIc5';

let map = L.mapquest.map('map', {
  center: [-33.92794,18.42359],
  layers: L.mapquest.tileLayer('map'),
  zoom: 14,
  zoomControl: false
});

let directionsControl = L.mapquest.directionsControl({
    className: '',
    directions: {
      options: {
        timeOverage: 25,
        doReverseGeocode: false,
      }
    },
    directionsLayer: {
      startMarker: {
        title: 'Drag to change location',
        draggable: true,
        icon: 'marker-start',
        iconOptions: {
          size: 'sm'
        }
      },
      endMarker: {
        draggable: true,
        title: 'Drag to change location',
        icon: 'marker-end',
        iconOptions: {
          size: 'sm'
        }
      },
      viaMarker: {
        title: 'Drag to change route'
      },
      routeRibbon: {
        showTraffic: true
      },
      alternateRouteRibbon: {
        showTraffic: true
      },
      paddingTopLeft: [450, 20],
      paddingBottomRight: [180, 20],
    },
    startInput: {
      compactResults: true,
      disabled: false,
      location: {},
      placeholderText: 'Starting point or click on the map...',
      geolocation: {
        enabled: true
      },
      clearTitle: 'Remove starting point'
    },
    endInput: {
      compactResults: true,
      disabled: false,
      location: {},
      placeholderText: 'Destination',
      geolocation: {
        enabled: true
      },
      clearTitle: 'Remove this destination'
    },
    addDestinationButton: {
      enabled: true,
      maxLocations: 10,
    },
    routeTypeButtons: {
      enabled: true,
    },
    reverseButton: {
      enabled: true,
    },
    optionsButton: {
      enabled: true,
    },
    routeSummary: {
      enabled: true,
      compactResults: false,
    },
    narrativeControl: {
      enabled: true,
      compactResults: false,
      interactive: true,
    }
}).addTo(map);


// function searchDirections( departure, destination){
//     let dir = MQ.routing.directions();

//     dir.route({
//       locations: [
//         departure,
//         destination
//       ]
//     });
    
//     let CustomRouteLayer = MQ.Routing.RouteLayer.extend({
//         createStartMarker: (location) => {
//             var custom_icon;
//             var marker;
    
//             custom_icon = L.icon({
//                 iconUrl: '/images/startmarker.png',
//                 iconSize: [20, 29],
//                 iconAnchor: [10, 29],
//                 popupAnchor: [0, -29]
//             });
    
//             marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
    
//             return marker;
//         },
    
//         createEndMarker: (location) => {
//             var custom_icon;
//             var marker;
    
//             custom_icon = L.icon({
//                 iconUrl: '/images/endmarker.png',
//                 iconSize: [20, 29],
//                 iconAnchor: [10, 29],
//                 popupAnchor: [0, -29]
//             });
    
//             marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
    
//             return marker;
//         }
//     });
    
//     map.addLayer(new CustomRouteLayer({
//         directions: dir,
//         fitBounds: true
//     }));
// }


// // for when the form on map is submitted
// function submitForm(event){
//     event.preventDefault()
//     console.log('Form Submitted!');

// // get data from the input box for map
//     departure = document.getElementById('departure').value;
//     destination = document.getElementById('destination').value;

//     //run directions function
//     searchDirections(departure, destination)



// }

// // assign form to a variable
// // const form = document.getElementById('form')

// // call form once submitted
// document.addEventListener( submitForm)

