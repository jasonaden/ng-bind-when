'use strict';

angular.module('angularBindWhenApp')
    .controller('MainCtrl', function ($scope) {
        $scope.list = [];
        $scope.list.length = 2;
        $scope.model = {
            bindIt: false
        };

        $scope.repeatIt = [];

        for (var i = 0 ; i < 50 ; i++) {
            $scope.repeatIt.push({
                title: 'Title ' + i,
                description: 'Description ' + i
            })
        }
    });
