// knockout-authenticate 0.4.2 | (c) 2014 Giang Nguyen |  http://www.opensource.org/licenses/mit-license
;(function(factory) {
    //CommonJS
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        factory(require("knockout"), exports, require("jquery"));
    //AMD
    } else if (typeof define === "function" && define.amd) {
        define(["knockout", "exports", "jquery"], factory);
    //normal script tag
    } else {
        factory(ko, ko.authenticate = {}, jQuery);
    }
}(function(ko, exports, $) {
    var config = ko.observable({
        loginUrl:       null,
        registerUrl:    null,
        excludes:       []
    });
    var checkToken = function(){
        if(window.localStorage.getItem('token') && window.localStorage.getItem('token.expired')){
            var now = new Date().getTime();
            if(window.localStorage.getItem('token.expired') * 1000 > now){
                // Setup request
                $.ajaxSetup({
                    beforeSend: function(jqXHR, settings) {
                        if(window.localStorage.getItem('token'))
                            settings.token = $.extend(settings.data, {token: window.localStorage.getItem('token')});
                        return true;
                    }
                });
                return true;
            }
        }
        return false;
    };
    exports.isLoggedIn = ko.observable(checkToken());

    exports.config = function(_config){
        config( $.extend({}, config(), _config));
    };

    exports.canAccess = function(page){
        if($.inArray(page , config().excludes) != -1){
            return true;
        }

        return exports.isLoggedIn();
    };

    exports.login = function(data, callback){
        $.ajax({
            type: 'POST',
            url: config().loginUrl,
            data: data,
            success: function(response) {
                if(response.error){
                    exports.isLoggedIn(false);
                }else{
                    exports.isLoggedIn(true);
                    window.localStorage.setItem('token', response.token);
                    window.localStorage.setItem('token.expired', response['token.expired']);
                }
                callback(response);
            },
            dataType: 'json'
        });
    };

    exports.register = function(data, callback){
        $.ajax({
            type: 'POST',
            url: config().registerUrl,
            data: data,
            success: function(response) {
                callback(response);
            },
            dataType: 'json'
        });
    };

    exports.logout = function(){
        exports.isLoggedIn(false);
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('token.expired', null);
    };

    ko.authenticate = exports;
}));
