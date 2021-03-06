'use strict';

angular.module('practiceApp')
  .controller('MainCtrl', function ($scope,$route, fireBaseCall) {

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
      $scope.login();

      setInterval(function () {
        $scope.login();
      }, 60000);

    };


    $scope.login = function () {
      var oldSession = localStorage.getItem('login');
      if (oldSession !== null) {
        oldSession = JSON.parse(oldSession);

        if (oldSession.valid >= (new Date().getTime())) {
          $scope.user = oldSession.user;
          document.getElementById('login').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> ' + $scope.user;
          var session = localStorage.getItem('session');
          if (session !== null) {
            $scope.connect(session);
          }
        }
        else {
          localStorage.removeItem('login');
          localStorage.removeItem('session');
        }
      }
    };

    $scope.signout = function (complete) {
      if(complete){
        localStorage.removeItem('login');
        $scope.user = '';
        document.getElementById('login').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> Login';
      }
      localStorage.removeItem('session');
      $scope.playerData = [];
      $scope.stockData = [];
      $scope.transactionData = [];
      document.getElementById('session').innerHTML = '';
      $route.reload();
    };


    $scope.connect = function (session) {
      $scope.playerData = fireBaseCall.newConnection('player-' + session);
      $scope.stockData = fireBaseCall.newConnection('stock-' + session);
      $scope.transactionData = fireBaseCall.newConnection('trans-' + session);
      document.getElementById('session').innerHTML = '<span class="glyphicon glyphicon-pencil"></span> ' + session;
    };

  });
