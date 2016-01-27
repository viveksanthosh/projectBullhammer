/**
 * Created by vivek_000 on 24-01-2016.
 */
'use strict';

angular.module('practiceApp')
  .controller('LoginCtrl', function ($scope, $route) {
    $scope.init = function () {
      $scope.trader_name = '';
      $scope.admin_name = '';
      $scope.admin_password = '';
    };

    $scope.verify = function () {
      if ($scope.trader_name === '') {
        window.alert('User Name Cannot Be Empty');
        return;
      }
      if ($scope.admin_name === 'Admin' && $scope.$parent.password === $scope.admin_password) {
        $scope.$parent.user = $scope.trader_name;
        window.alert('Successful LoginIn');
        document.getElementById('login').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> ' + $scope.$parent.user;
        $route.reload();
      }
      else {
        window.alert('Incorrect Admin Name Or Password');
      }
    };
  }
);
