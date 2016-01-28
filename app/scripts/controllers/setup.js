'use strict';

angular.module('practiceApp')
  .controller('SetupCtrl', function ($scope, $timeout, fireBaseCall, $route) {

    $scope.$watch('stockNum', function (newValue, oldValue) {
      if (oldValue !== newValue) {
        $scope.stockArray = [];
        for (var i = 0; i < newValue; i++) {
          $scope.stockArray.push({name: '-', quantity: 0, price: 0});
        }
      }

    });

    $scope.$watch('teamNum', function (newValue, oldValue) {
      if (oldValue !== newValue) {
        $scope.teamArray = [];
        for (var i = 0; i < newValue; i++) {
          $scope.teamArray.push({name: '-'});
        }
      }
    });

    $scope.init = function () {
      $scope.sessionID = '-';
      $scope.cashBal = 0;
      $scope.stockNum = 0;
      $scope.circuit = 0;
      $scope.teamNum = 0;
    };

    $scope.setData = function () {

      if ($scope.$parent.user === '') {
        window.alert('Please Login');
        return;
      }

      $scope.$parent.playerData = fireBaseCall.newConnection('player-' + $scope.sessionID);
      $scope.$parent.stockData = fireBaseCall.newConnection('stock-' + $scope.sessionID);
      $scope.$parent.transactionData = fireBaseCall.newConnection('trans-' + $scope.sessionID);

      $scope.$parent.transactionData.$loaded(function () {
        window.alert('Connection Successful');
        localStorage.setItem('session' , $scope.sessionID);
        document.getElementById('session').innerHTML = '<span class="glyphicon glyphicon-pencil"></span> ' + $scope.sessionID;
        $route.reload();
      });

      var stocks = [];

      $scope.stockArray.forEach(function (stock) {
        stocks.push({name: stock.name, quantity: stock.quantity});
        $scope.$parent.stockData.$add({
          name: stock.name,
          circuitPrice: stock.price,
          circuitPercentage: $scope.circuit,
          tradeCount: 0,
          totalTrade: [0],
          totalQuantity: [0],
          ltp: stock.price,
          arrow: 2,
          highlight: ''
        });
      });


      $scope.teamArray.forEach(function (team) {
        $scope.$parent.playerData.$add({
          name: team.name,
          cash: $scope.cashBal,
          stock: stocks,
          debits: ["session - " + $scope.sessionID],
          credits: ["session - " + $scope.sessionID]
        });
      });

      $scope.$parent.transactionData.$add({
        trades: ["session - " + $scope.sessionID]
      });

    };

  });
