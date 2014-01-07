(function () {
    'use strict';

    function skipWatcher(context) {
        return !context.$$skipWatchers;
    }

    angular.module('angularBindWhenApp')
        .config(function ($provide) {
            $provide.decorator('$interpolate', function ($delegate) {
                // decorate the $delegate ($interpolate) function
                function $interpolate() {
                    var interpolate = $delegate.apply({}, arguments),
                        retValue = {};

                    // There is interpolation required
                    if (interpolate) {
                        // Wrap interpolation function to confirm it should be run
                        return function (context /*scope*/) {
                            if (retValue[context.$id] !== undefined && !skipWatcher(context))
                                return retValue[context.$id];
                            retValue[context.$id] = interpolate(context);

                            return retValue[context.$id];
                        }
                    }

                    return interpolate;
                }

                angular.extend($interpolate, $delegate);

                return $interpolate;
            });
        })
        .directive('ngBindWhen', ['$parse', function ($parse) {
            return {
                scope: true,
                link: function (scope, element, attrs) {
                    scope.$$skipWatchers = true;

                    var exp = $parse(attrs.ngBindWhen);

                    scope.$watch(function (s) {
                        if (scope.hasOwnProperty('$$skipWatchers')) {
                            scope.$$skipWatchers = !exp(scope);
                        }
                        return scope.$$skipWatchers;
                    })
                }
            }
        }]);

})()