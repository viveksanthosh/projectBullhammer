'use strict';

angular.module('practiceApp')
  .controller('TradeCtrl', function ($scope) {

    $scope.init = function () {
      $scope.selectedStock = '';
      $scope.selectedTeam = '';
      $scope.selectedQuantity = 0;
      $scope.selectedPrice = 0;
      $scope.transactionType = '';
    };

    $scope.transact = function () {
      var circuit = $scope.$parent.stockData[$scope.selectedStock].circuitPrice * $scope.$parent.stockData[$scope.selectedStock].circuitPercentage / 100
      var upCircuit = $scope.$parent.stockData[$scope.selectedStock].circuitPrice + circuit;
      var downCircuit = $scope.$parent.stockData[$scope.selectedStock].circuitPrice - circuit;
      var tradePrice = $scope.selectedPrice * $scope.selectedQuantity;

      if (upCircuit > $scope.selectedPrice) {
        if (downCircuit < $scope.selectedPrice) {


          if ($scope.transactionType === 'Sell') {

            if ($scope.$parent.playerData[$scope.selectedTeam].stock[$scope.selectedStock].quantity >= $scope.selectedQuantity) {
              $scope.$parent.playerData[$scope.selectedTeam].stock[$scope.selectedStock].quantity = $scope.$parent.playerData[$scope.selectedTeam].stock[$scope.selectedStock].quantity - $scope.selectedQuantity;
              $scope.$parent.playerData[$scope.selectedTeam].cash = parseInt($scope.$parent.playerData[$scope.selectedTeam].cash) + tradePrice;
              var message = "Sold " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.playerData[$scope.selectedTeam].credits.unshift(message);
              $scope.$parent.playerData.$save($scope.$parent.playerData[$scope.selectedTeam]);

              $scope.$parent.stockData[$scope.selectedStock].totalTrade += tradePrice;
              $scope.$parent.stockData[$scope.selectedStock].totalQuantity += parseInt($scope.selectedQuantity);
              if ($scope.$parent.stockData[$scope.selectedStock].tradeCount == 2) {
                $scope.$parent.stockData[$scope.selectedStock].ltp = $scope.$parent.stockData[$scope.selectedStock].totalTrade / $scope.$parent.stockData[$scope.selectedStock].totalQuantity;
                $scope.$parent.stockData[$scope.selectedStock].tradeCount = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalTrade = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalQuantity = 0;
              }
              else {
                $scope.$parent.stockData[$scope.selectedStock].tradeCount += 1;
              }
              $scope.$parent.stockData.$save($scope.$parent.stockData[$scope.selectedStock]);

              message = $scope.$parent.playerData[$scope.selectedTeam].name + " Sold " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.transactionData[0].trades.unshift(message);
              $scope.$parent.transactionData.$save($scope.$parent.transactionData[0]);
              return;

            }
            else {
              alert("InSufficient quantity to sell");
              return;
            }
          }

          else if ($scope.transactionType === 'Buy') {

            if ($scope.$parent.playerData[$scope.selectedTeam].cash >= tradePrice) {

              $scope.$parent.playerData[$scope.selectedTeam].stock[$scope.selectedStock].quantity = $scope.$parent.playerData[$scope.selectedTeam].stock[$scope.selectedStock].quantity + $scope.selectedQuantity;
              $scope.$parent.playerData[$scope.selectedTeam].cash = parseInt($scope.$parent.playerData[$scope.selectedTeam].cash) - tradePrice;
              var message = "Purchased " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.playerData[$scope.selectedTeam].credits.unshift(message);
              $scope.$parent.playerData.$save($scope.$parent.playerData[$scope.selectedTeam]);

              $scope.$parent.stockData[$scope.selectedStock].totalTrade += tradePrice;
              $scope.$parent.stockData[$scope.selectedStock].totalQuantity += parseInt($scope.selectedQuantity);
              if ($scope.$parent.stockData[$scope.selectedStock].tradeCount == 2) {
                $scope.$parent.stockData[$scope.selectedStock].ltp = $scope.$parent.stockData[$scope.selectedStock].totalTrade / $scope.$parent.stockData[$scope.selectedStock].totalQuantity;
                $scope.$parent.stockData[$scope.selectedStock].tradeCount = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalTrade = 0;
                $scope.$parent.stockData[$scope.selectedStock].totalQuantity = 0;
              }
              else {
                $scope.$parent.stockData[$scope.selectedStock].tradeCount += 1;
              }
              $scope.$parent.stockData.$save($scope.$parent.stockData[$scope.selectedStock]);

              message = $scope.$parent.playerData[$scope.selectedTeam].name + " Purchased " + $scope.selectedQuantity + " " + $scope.$parent.stockData[$scope.selectedStock].name + " for " + tradePrice + " at " + Date();
              $scope.$parent.transactionData[0].trades.unshift(message);
              $scope.$parent.transactionData.$save($scope.$parent.transactionData[0]);
              return;
            }
            else {
              alert("Not enough cash to buy");
              return;
            }
          }


        } else {
          alert("Lower Circuit Hit");
          return;
        }


      }
      else {
        alert("Upper Circuit Hit");
        return;
      }
      ;
    }
  });
