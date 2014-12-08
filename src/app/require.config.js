// require looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout.debug",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
		"knockout-authenticate": "bower_modules/knockout-authenticate/knockout-authenticate",
		
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "underscore":           "bower_modules/underscore/underscore",
        "mediator-js":          "bower_modules/mediator-js/mediator.min",
        "config":               "app/config",
        "core":                 "scripts/core",
        "smartexts":            "scripts/smartexts/smartexts",
        "map":                  "scripts/smartexts/extensions/map/map",
        "map-events":           "scripts/smartexts/extensions/map/map-events",
        "map-infowindow":       "scripts/smartexts/extensions/map/map-infowindow",
        "map-markers":          "scripts/smartexts/extensions/map/map-markers",
        "map-oms":              "scripts/smartexts/extensions/map/map-oms",
        "map-polygons":         "scripts/smartexts/extensions/map/map-polygons",
        "map-polylines":        "scripts/smartexts/extensions/map/map-polylines",
        "map-drawing":          "scripts/smartexts/extensions/map/map-drawing",
        "map-style-preset":     "scripts/smartexts/extensions/map/map-style-preset",
        "map-geolocation":      "scripts/smartexts/extensions/map/map-geolocation",
        "map-anchor":           "scripts/smartexts/extensions/map/map-anchor",
        "map-markerclusterer":  "scripts/smartexts/extensions/map/map-markerclusterer",
        "datacontext":          "scripts/smartexts/extensions/datacontext",
        "MarkerClusterer":      "scripts/Markerclusterer/markerclusterer_compiled",
        "OverlappingMarkerSpiderfier": "scripts/OverlappingMarkerSpiderfier/oms.min",

        "text":                  "bower_modules/requirejs-text/text"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
