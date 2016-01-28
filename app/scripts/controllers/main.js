'use strict';

angular.module('practiceApp')
  .controller('MainCtrl', function ($scope, fireBaseCall) {

    $scope.$watch('team', function (newValue, oldValue) {
      if (newValue !== '' && newValue !== oldValue) {
        $scope.total();
      }
    }, true);

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
      var old_session = localStorage.getItem('login');

      if (old_session !== null) {
        old_session = JSON.parse(old_session);

        if (old_session.valid >= (new Date().getTime())) {
          console.log(localStorage.getItem('session'));
          $scope.user = old_session.user;
          document.getElementById('login').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> ' + $scope.user;
        }
        else {
          localStorage.removeItem('login');
        }
      }

    };
  });
