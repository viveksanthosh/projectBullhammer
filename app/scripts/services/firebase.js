/**
 * Created by vivek_000 on 19-12-2015.
 */
'use strict';

angular.module('practiceApp').factory("fireBaseCall", ["$firebaseArray",
  function ($firebaseArray) {
    return {
      newConnection: function (sessionId) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase();
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
      }
    }
  }
]);

/*
Data Structure:
 |
 |-- password {password: value}
 |-- player-'session id'
 |    |- multiple
 |     	|-{name: value}
 |    	|-{cash: value}
 |     	|- {stock : object_of_stocks}
 |     	|-debitHistory[array]
 |    	|-creditHistory[array]
 |
 |-- stock-'session id'
 |     |- multiple
 |     	|-{stockName: value}
 |    	|-{circuit breaker: value}
 |     	|-{cb%: value}
 |     	|-{tradePrice 1: value}
 |    	|-{tradeQuantity 1: value}
 |     	|-{tradePrice 2: value}
 |    	|-{tradeQuantity 2: value}
 |     	|-{tradePrice 3: value}
 |    	|-{tradeQuantity 3: value}
 |     	|-{LTP: value}
 |
 |
 |-- transcations-'session id'
 | 		|- array[]
 |
 |
 |


 */
