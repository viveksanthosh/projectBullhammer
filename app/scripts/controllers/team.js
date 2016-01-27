'use strict';

angular.module('practiceApp')
  .controller('TeamCtrl', function ($scope) {

    $scope.init = function () {
      $scope.team = '';

    };

    $scope.$watch('team', function (newValue, oldValue) {
      if (newValue !== '' && newValue !== oldValue) {
        $scope.total();
      }
    }, true);

    $scope.total = function () {
      $scope.shareTotal = 0;
      $scope.$parent.playerData[$scope.team].stock.forEach(function (stock, count) {
        $scope.shareTotal = $scope.shareTotal + parseInt(stock.quantity * $scope.$parent.stockData[count].ltp);
      });
      return $scope.shareTotal;
    };
  }
);
