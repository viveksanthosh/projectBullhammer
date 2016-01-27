'use strict';

angular.module('practiceApp')
  .controller('MainCtrl', function ($scope, fireBaseCall) {

    /*$scope.$watch('user', function (newValue, oldValue) {
      if (newValue !== '' && newValue !== oldValue) {
        document.getElementById('login').innerHTML ='<span class="glyphicon glyphicon-log-in"></span> '+ newValue;
      }
    }, true);

    $scope.$watch('user', function (newValue, oldValue) {
      if (newValue !== '' && newValue !== oldValue) {
        document.getElementById('login').innerHTML ='<span class="glyphicon glyphicon-log-in"></span> '+ newValue;
      }
    }, true);*/

    $scope.init = function () {
      $scope.playerData = [];
      $scope.stockData = [];
      $scope.transactionData = [];
      $scope.user = '';
      $scope.password = '';
      var password = fireBaseCall.newConnection('password');
      password.$loaded(function () {
        $scope.password = password[0].password;
      });
    };
  });
