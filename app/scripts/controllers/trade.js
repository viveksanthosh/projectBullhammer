'use strict';

angular.module('practiceApp')
  .controller('TradeCtrl', function ($scope) {

    $scope.init = function () {
      $scope.selectedStock = '';
      $scope.buyerTeam = '';
      $scope.sellerTeam = '';
      $scope.selectedQuantity = 0;
      $scope.selectedPrice = 0;

    };

    $scope.transact = function () {
      if ($scope.$parent.user === '') {
        alert('Please Login');
        return;
      }
      var circuit = $scope.$parent.stockData[$scope.selectedStock].circuitPrice * $scope.$parent.stockData[$scope.selectedStock].circuitPercentage / 100
      var upCircuit = parseInt($scope.$parent.stockData[$scope.selectedStock].circuitPrice) + circuit;
      var downCircuit = $scope.$parent.stockData[$scope.selectedStock].circuitPrice - circuit;
      var tradePrice = $scope.selectedPrice * $scope.selectedQuantity;

      if (upCircuit > $scope.selectedPrice) {
        if (downCircuit < $scope.selectedPrice) {
          if ($scope.$parent.playerData[$scope.buyerTeam].cash >= tradePrice) {
            if ($scope.$parent.playerData[$scope.sellerTeam].stock[$scope.selectedStock].quantity >= $scope.selectedQuantity) {

              $scope.$parent.playerData[$scope.buyerTeam].stock[$scope.selectedStock].quantity = parseInt($scope.$parent.playerData[$scope.buyerTeam].stock[$scope.selectedStock].quantity) + parseInt($scope.selectedQuantity);
              $scope.$parent.playerData[$scope.sellerTeam].stock[$scope.selectedStock].quantity = parseInt($scope.$parent.playerData[$scope.sellerTeam].stock[$scope.selectedStock].quantity) - parseInt($scope.selectedQuantity);
              $scope.$parent.playerData[$scope.buyerTeam].cash -= tradePrice;
              $scope.$parent.playerData[$scope.sellerTeam].cash = parseInt($scope.$parent.playerData[$scope.sellerTeam].cash) + tradePrice;

              var message = "Sold " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " to " + $scope.$parent.playerData[$scope.buyerTeam].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.playerData[$scope.sellerTeam].credits.unshift(message);
              message = "Purchased " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " from " + $scope.$parent.playerData[$scope.sellerTeam].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.playerData[$scope.buyerTeam].debits.unshift(message);
              $scope.$parent.playerData.$save($scope.$parent.playerData[$scope.sellerTeam]);
              $scope.$parent.playerData.$save($scope.$parent.playerData[$scope.buyerTeam]);

              $scope.$parent.stockData[$scope.selectedStock].totalTrade += tradePrice;
              $scope.$parent.stockData[$scope.selectedStock].totalQuantity += parseInt($scope.selectedQuantity);
              if ($scope.$parent.stockData[$scope.selectedStock].tradeCount == 2) {
                $scope.$parent.stockData[$scope.selectedStock].ltp = ($scope.$parent.stockData[$scope.selectedStock].totalTrade / $scope.$parent.stockData[$scope.selectedStock].totalQuantity).toFixed(2);
                $scope.$parent.stockData[$scope.selectedStock].tradeCount = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalTrade = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalQuantity = 0;
              }
              else {
                $scope.$parent.stockData[$scope.selectedStock].tradeCount += 1;
              }
              $scope.$parent.stockData.$save($scope.$parent.stockData[$scope.selectedStock]);

              message = $scope.$parent.playerData[$scope.sellerTeam].name + " Sold " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name +" to "+$scope.$parent.playerData[$scope.buyerTeam].name+ " for " + tradePrice + " at " + Date();
              $scope.$parent.transactionData[0].trades.unshift(message);
              $scope.$parent.transactionData.$save($scope.$parent.transactionData[0]);



            } else {
              alert("Not quantity to sell");
            }
          }
          else {
            alert("Not enough cash to buy");
          }

        } else {
          alert("Lower Circuit Hit, Please trade between "+downCircuit+" and "+upCircuit);
        }
      }
      else {
        alert("Upper Circuit Hit, Please trade between "+downCircuit+" and "+upCircuit);
      }

    }
  }
);
