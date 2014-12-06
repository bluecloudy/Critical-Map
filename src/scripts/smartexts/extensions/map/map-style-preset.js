
(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'), require('config'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts', 'config'], factory);
        // Browser
    } else {
        factory();
    }
}((typeof window === 'object' && window) || this, function (SE, Config) {

    SE.extension('map-style-preset', function () {
        var Map;
        var presets;
        var self = this;

        self.sandbox.subscribe("map:style:preset:select", function (style) {
            // Set style
            var defaultStyle = self.utils.findWhere(presets, {
                id: style
            });
            Map.setOptions({
                styles: defaultStyle.styles
            });
        }, this);

        // Map response
        self.sandbox.subscribe("map:created", function (map) {
            Map = map;
            // Load preset
            presets = Config.stylePresets;
            self.sandbox.publish('map:style:preset:loaded', presets);
            self.sandbox.publish('map:style:preset:select', 'default');
        }, this);

        self.sandbox.subscribe("map:style:preset:staticMap", function (data, callback) {
            var url = [];

            self.utils.each(data.styles, function (value) {
                var style = 'style=feature:' + value.featureType + encodeURIComponent('|') + 'element:' + (value.elementType ? value.elementType : 'all');
                self.utils.each(value.stylers, function (item) {
                    self.utils.each(item, function (val, key) {
                        if (self.utils.contains(['hue', 'color'], key)) {
                            val = val.replace('#', '0x');
                        }
                        style += encodeURIComponent('|' + key + ':' + val);
                    });
                });

                url.push(style);
            });

            callback('http://maps.googleapis.com/maps/api/staticmap?size=50x50&zoom=0&center=Brooklyn&' + url.join('&'));
        }, this);
    });

}));