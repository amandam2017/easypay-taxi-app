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

