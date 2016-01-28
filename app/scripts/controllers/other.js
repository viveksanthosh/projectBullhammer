'use strict';

angular.module('practiceApp')
  .controller('OtherCtrl', function ($scope, fireBaseCall, $route) {

    $scope.init = function () {
      $scope.session = 0;
      $scope.circuit = 0;
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
          localStorage.setItem('session' , $scope.session);
          document.getElementById('session').innerHTML = '<span class="glyphicon glyphicon-pencil"></span> ' + $scope.session;
          $route.reload();
        }
        else {
          window.alert('Session Does Not Exist');
        }
      });

    };

    $scope.newPhase = function () {

      if ($scope.$parent.user === '') {
        window.alert('Please Login');
        return;
      }

      if ($scope.circuit > 100 || $scope.circuit < 0) {
        window.alert('Invalid Circuit Breaker %');
        return;
      }

      var count = 0;
      for (count = 0; count < $scope.$parent.stockData.length; count++) {
        $scope.$parent.stockData[count].circuitPrice = $scope.$parent.stockData[count].ltp;
        $scope.$parent.stockData[count].circuitPercentage = $scope.circuit;
        $scope.$parent.stockData.$save($scope.$parent.stockData[count]);
      }
      window.alert('New Phase In Session');
    };

  });
