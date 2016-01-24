'use strict';

angular.module('practiceApp')
  .controller('OtherCtrl', function ($scope, fireBaseCall) {

    $scope.init = function () {
      $scope.session = 0;
    };

    $scope.setSession = function () {

      if ($scope.$parent.user === '') {
        alert('Please Login');
        return;
      }
      $scope.$parent.playerData = fireBaseCall.newConnection('player-' + $scope.session);
      $scope.$parent.stockData = fireBaseCall.newConnection('stock-' + $scope.session);
      $scope.$parent.transactionData = fireBaseCall.newConnection('trans-' + $scope.session);
    };


  });
