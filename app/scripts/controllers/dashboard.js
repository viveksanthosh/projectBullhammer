'use strict';

angular.module('practiceApp')
  .controller('DashboardCtrl', function () {


  });

angular.module('practiceApp')
  .controller('ArrowCtrl', function ($scope) {
    $scope.$watch('stock.ltp', function (newValue, oldValue) {
      if (oldValue !== newValue) {
        if (oldValue > newValue) {
          $scope.arrow = 0;
        }
        else {
          $scope.arrow = 1;
        }

      }
    }, true);
  });
