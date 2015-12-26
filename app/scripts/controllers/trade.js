'use strict';

angular.module('practiceApp')
  .controller('TradeCtrl', function ($scope) {

    $scope.init = function () {
      $scope.selectedStock='';
      $scope.selectedTeam='';
      $scope.selectedQuantity='0';
      $scope.selectedPrice='0';
    };


  });
