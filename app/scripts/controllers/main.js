'use strict';

angular.module('practiceApp')
  .controller('MainCtrl', function ($scope) {

    $scope.init = function () {
      $scope.playerData=[];
      $scope.stockData=[];
      $scope.transactionData=[];
      $scope.password='';
    };
  });
