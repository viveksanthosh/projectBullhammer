'use strict';

angular.module('practiceApp')
  .controller('MainCtrl', function ($scope,fireBaseCall) {

    $scope.init = function () {
      $scope.playerData=[];
      $scope.stockData=[];
      $scope.transactionData=[];
      $scope.user='';
      $scope.password='';
      var password = fireBaseCall.newConnection('password');
      password.$loaded(function () {
        $scope.password = password[0].password;
      });
    };
  });
