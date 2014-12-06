// Core objects
define([
    'knockout',
    'smartexts',
    'map',
    'map-events',
    'map-markers',
    'map-oms',
    'map-polygons',
    'map-polylines',
    'map-drawing',
    'map-style-preset',
    'map-geolocation',
    'map-anchor',
    'datacontext',
    'map-infowindow'
], function(ko, SE){

    ko.bindingHandlers.map = {
        init: function (element, valueAccessor) {
            se.sandbox.publish('map:create', element, this);
        }
    };

    ko.bindingHandlers.MapControl = {
        update: function (el, valueAccessor, allValueAccessor, viewModel) {

            var unwrap = function (obj) {
                return (!obj) ? null : ( (obj instanceof jQuery) ? obj[0] : ((obj instanceof Object) ? obj : $('#' + obj)[0]) )
            };

            var prepareMapControl = function (element) {
                element = unwrap(element);
                element.index = 1;
                return element;
            };

            se.sandbox.subscribe('map:created', function (map) {
                var options = valueAccessor();
                /**
                 * options.position
                 *  BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, LEFT_BOTTOM, LEFT_CENTER, LEFT_TOP, RIGHT_BOTTOM, RIGHT_CENTER, RIGHT_TOP, TOP_CENTER, TOP_LEFT, TOP_RIGHT
                 */
                /**
                 *
                 * @type google.maps
                 */
                if (map)
                    map.controls[google.maps.ControlPosition[options.position]].push(prepareMapControl(el));
            });


        }
    };



    var se = SE()
        .use('map')
        .use('map-events')
        .use('map-markers')
//        .use('map-oms')
        .use('map-polygons')
        .use('map-polylines')
        .use('map-infowindow')
        .use('map-drawing')
        .use('map-drawing-shape')
        .use('map-style-preset')
        .use('map-geolocation')
        .use('map-anchor')
		.use('datacontext')
        .start();

    return se;
});