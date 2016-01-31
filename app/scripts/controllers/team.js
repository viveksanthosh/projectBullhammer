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


    $scope.$watch('$parent.playerData', function (newValue, oldValue) {
      if (newValue !== '' && newValue !== oldValue) {
        $scope.total();
      }
    }, true);


    $scope.total = function () {
      $scope.shareTotal = 0;
      if ($scope.$parent.playerData[$scope.team].stock !== undefined) {
        $scope.$parent.playerData[$scope.team].stock.forEach(function (stock, count) {
          $scope.shareTotal = ((1 * $scope.shareTotal) + (1 * stock.quantity * $scope.$parent.stockData[count].ltp)).toFixed(2);
        });
        $scope.networth = (($scope.playerData[$scope.team].cash * 1 ) + ($scope.shareTotal * 1 )).toFixed(2);
      }
    };

  }
);
