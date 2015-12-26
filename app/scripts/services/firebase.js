/**
 * Created by vivek_000 on 19-12-2015.
 */
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
