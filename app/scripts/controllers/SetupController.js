'use strict';

angular.module('practiceApp')
  .controller('SetupCtrl', function ($scope) {

    $scope.$watch('stockNum', function (newValue, oldValue) {
      if (oldValue != newValue) {
        $scope.stockArray = [];
        for (var i = 0; i < newValue; i++)
          $scope.stockArray.push({name: '', quantity: 0});
      }

    });


    $scope.init = function () {
      $scope.sessionID = '';
      $scope.cashBal = 0;
      $scope.stockNum = 0;
      $scope.circuit = 0;

    };
  });
