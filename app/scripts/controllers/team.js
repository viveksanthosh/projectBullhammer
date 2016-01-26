'use strict';

angular.module('practiceApp')
  .controller('TeamCtrl', function ($scope) {

    $scope.init = function () {
      $scope.team = '';

    }
    $scope.total=function(){
      $scope.shareTotal=0;
    $scope.$parent.playerData[$scope.team].stock.forEach(function(stock, count){
      $scope.shareTotal = $scope.shareTotal + parseInt(stock.quantity * $scope.$parent.stockData[count].ltp);
      console.log(count);
    });
      return $scope.shareTotal;
    }
  }

  );
