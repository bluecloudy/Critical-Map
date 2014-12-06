(function(root, factory){
    'use strict';

    // CommonJS
    if (typeof exports === 'object' && module){
        module.exports = factory(require('knockout'), require('mediator-js'), require('underscore'));

        // AMD
    } else if (typeof define === 'function' && define.amd){
        define([ 'knockout', 'mediator-js', 'underscore'],factory);
        // Browser
    } else {
        root.SE = factory(root.ko ,root.Mediator, root._);
    }
}( ( typeof window === 'object' && window ) || this, function(ko, mediator, _){

    var SE = function (options) {
        if (this instanceof SE === false) {
            return new SE(options);
        }

        // Pub//sub
        var _mediator = new mediator(),
            _app = this,
            _extensions = [],
            initialized = [];

        _app.sandbox = {
            publish: function(channelName){
                var args = Array.prototype.slice.call(arguments, 1);
                args.unshift(channelName);
                _mediator.publish.apply(_mediator, args);
            },
            subscribe: function(channelName, fn, options, context){
                if(arguments.length <= 3){
                    context = options;
                    options = {};
                }
                _mediator.subscribe(channelName, fn, options, context);

            }
        };

        // Utils
        _app.utils = {
            _: _,
            extend: _.extend,
            each: _.each,
            filter: _.filter,
            find: _.find,
            without: _.without,
            contains: _.contains,
            where: _.where,
            findWhere: _.findWhere
        };

        // Extend options
        if(options){
            _app.utils.extend(_app.utils, options);
        }

        // Use extension
        this.use = function(extension, asComponent){
            if(asComponent){
                //todo: add knockout component
            }
            _extensions.push(extension);
            return this;
        };

        this.getExtension = function(name){
            return SE.extensions[name];
        };

        // Start
        this.start = function () {
            for (var x in _extensions) {
                if (_extensions.hasOwnProperty(x)) {
                    if(SE.extensions[_extensions[x]]){
                        var object = SE.extensions[_extensions[x]].clone();
                        if(object.constructor === Object){
                            object = _app.utils.extend(object, _app);

                            if(object.initialize)
                                object.initialize();
                            initialized.push(object);
                        }else{
                            _app.utils.extend(object.prototype, _app);
                            initialized.push(new object());
                        }
                    }

                }
            }
            return this;
        };
    };
    // Core extension
    SE.extensions = {};
    // Add extension
    SE.extension = function (name, object) {
        SE.extensions[name] = object;
        return this;
    };


    // Override component binding
    SE.extension('map-component', {
        initialize: function(){
            var self = this;

            // Override component binding
            ko.bindingHandlers['map-component'] = {
                'init': function(element, valueAccessor, ignored1, ignored2, bindingContext) {
                    var value = valueAccessor();
                    if(typeof value == 'string') value = {name: value, params: {}};
                    if(typeof value.params == 'undefined') value.params = {};
                    value.params.app = self;
                    ko.bindingHandlers['component'].init(element, function (){return value;}, ignored1, ignored2, bindingContext);
                }
            };

            ko.virtualElements.allowedBindings['map-component'] = true;
        }
    });

    return SE;
}));

Function.prototype.clone = function() {
    var cloneObj = this;
    if(this.__isClone) {
        cloneObj = this.__clonedFrom;
    }

    var temp = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;
};