/**
 * Created by vivek_000 on 19-12-2015.
 */
app.factory("firebase", ["$firebaseArray",
  function ($firebaseArray) {
    return {
      newConnection: function () {
        // create a reference to the database location where we will store our data
        var ref = new Firebase("");
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
      }
    }
  }
]);
