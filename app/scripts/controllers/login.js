/**
 * Created by vivek_000 on 24-01-2016.
 */
'use strict';

angular.module('practiceApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.init = function () {
      $scope.trader_name = '';
      $scope.admin_name = '';
      $scope.admin_password = '';
    };

    $scope.verify = function () {
      if ($scope.trader_name === '') {
        alert('User Name Cannot Be Empty');
        return;
      }
      if ($scope.admin_name === 'Admin' && $scope.$parent.password === $scope.admin_password) {
        $scope.$parent.user = $scope.trader_name;
        alert('Successful LoginIn');
      }
      else {
        alert('Incorrect Admin Name Or Password');
      }
    };
  }
);
