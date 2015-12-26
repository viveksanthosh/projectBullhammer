'use strict';

/**
 * @ngdoc overview
 * @name practiceApp
 * @description
 * # practiceApp
 *
 * Main module of the application.
 */
angular
  .module('practiceApp', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
