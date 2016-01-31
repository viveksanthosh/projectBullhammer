/**
 * Created by vivek_000 on 19-12-2015.
 */
'use strict';

angular.module('practiceApp').factory('fireBaseCall', ['$firebaseArray',
  function ($firebaseArray) {
    return {
      newConnection: function (sessionId) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase();
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
      }
    };
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
 |     	|-stock -- multiple -- {name : value, quantity : value}
 |     	|-debits[array]
 |    	|-credits[array]
 |
 |-- stock-'session id'
 |     |- multiple
 |      	|- {arrow : value}
 |      	|-{highlight: value}
 |      	|-{stockName: value}
 |      	|-{circuit breaker: value}
 |      	|-{cb%: value}
 |      	|-{totalTrade : array[values]}
 |      	|-{totalQuantity : array[values]}
 |      	|-{LTP: value}
 |
 |
 |-- transcations-'session id'
 | 		|- {trades : array[values]}
 |
 |
 |


 */
