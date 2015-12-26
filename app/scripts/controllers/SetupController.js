'use strict';

angular.module('practiceApp')
  .controller('SetupCtrl', function ($scope,$timeout,fireBaseCall) {

    $scope.$watch('stockNum', function (newValue, oldValue) {
      if (oldValue != newValue) {
        $scope.stockArray = [];
        for (var i = 0; i < newValue; i++)
          $scope.stockArray.push({name: '', quantity: 0});
      }

    });

    $scope.$watch('teamNum', function (newValue, oldValue) {
      if (oldValue != newValue) {
        $scope.teamArray = [];
        for (var i = 0; i < newValue; i++)
          $scope.teamArray.push({name: ''});
      }
    });

    $scope.init = function () {
      $scope.sessionID = '-';
      $scope.cashBal = 0;
      $scope.stockNum = 0;
      $scope.circuit = 0;
      $scope.teamNum = 0;
    };

    $scope.setData=function(){
      $scope.$parent.playerData=fireBaseCall.newConnection('player-'+$scope.sessionID);

      var stocks={};

      $scope.stockArray.forEach(function(stock){
        stocks[stock.name]=stock.quantity;
      })


      $scope.teamArray.forEach(function(team){
        $scope.$parent.playerData.$add({
          name: team.name,
          cash:  $scope.cashBal,
          stock: stocks,
          debits :[],
          credits :[]
        });
      });


      $scope.$parent.playerData.$loaded(function() {

      });

    };

  });
