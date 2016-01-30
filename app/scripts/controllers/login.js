/**
 * Created by vivek_000 on 24-01-2016.
 */
'use strict';

angular.module('practiceApp')
  .controller('LoginCtrl', function ($scope, $route) {
    $scope.init = function () {
      $scope.traderName = '';
      $scope.adminName = '';
      $scope.adminPassword = '';
    };

    $scope.verify = function () {
      if ($scope.traderName === '') {
        window.alert('User Name Cannot Be Empty');
        return;
      }

      if ($scope.traderName.length > 4) {
        window.alert('User Name Cannot Be More Than 4 Characters');
        return;
      }

      if ($scope.adminName === 'Admin' && $scope.$parent.password === $scope.adminPassword) {
        $scope.$parent.user = $scope.traderName;
        window.alert('Successful LoginIn');
        document.getElementById('login').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> ' + $scope.$parent.user;
        localStorage.setItem('login', JSON.stringify({
          'user': $scope.$parent.user,
          'valid': ((new Date().getTime()) + (20 * 60 * 1000))
        }));
        $route.reload();
      }
      else {
        window.alert('Incorrect Admin Name Or Password');
      }
    };
  }
);
