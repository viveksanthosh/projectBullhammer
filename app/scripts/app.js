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
      .when('/setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl'
      })
      .when('/trade', {
        templateUrl: 'views/trade.html',
        controller: 'TradeCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/transaction.html',
        controller: 'TransCtrl'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/other', {
        templateUrl: 'views/other.html',
        controller: 'OtherCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
