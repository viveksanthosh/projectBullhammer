'use strict';

angular.module('practiceApp')
  .controller('OtherCtrl', function ($scope, fireBaseCall,$route) {

    $scope.init = function () {
      $scope.session = 0;
    };

    $scope.setSession = function () {

      if ($scope.$parent.user === '') {
        window.alert('Please Login');
        return;
      }
      $scope.$parent.playerData = fireBaseCall.newConnection('player-' + $scope.session);
      $scope.$parent.stockData = fireBaseCall.newConnection('stock-' + $scope.session);
      $scope.$parent.transactionData = fireBaseCall.newConnection('trans-' + $scope.session);

      $scope.$parent.transactionData.$loaded(function () {
        if ($scope.$parent.transactionData[0].trades.length !== undefined) {
          window.alert('Connection Successful');
          $route.reload();
        }
        else {
          window.alert('Session Does Not Exist');
        }
      });

    };


  });
