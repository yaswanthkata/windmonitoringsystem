app.factory('firebaseFactory', ['$firebaseArray', function ($firebaseArray) {
        var firebaseFactory = {};

        firebaseFactory.getReports = function () {
            var ref = new Firebase("https://windreporting.firebaseio.com/reports");

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        };
        // create a reference to the database location where we will store our data
  

        return firebaseFactory;
    }
]);