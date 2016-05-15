app.controller('HomeController', ['$scope', 'stateFactory', '$firebaseArray', '$firebaseObject', 'firebaseFactory','Notification',
function ($scope, stateFactory, $firebaseArray, $firebaseObject, firebaseFactory, Notification) {

    var windReport = {};
    var reports = [];
    $scope.stationCode;
    $scope.buttonDisabled = true;
    getStates();
    function getStates() {
        stateFactory.getStates()
            .then(function (response) {
                $scope.states = response.data.Data;
                $scope.state = $scope.states[0];
                $scope.cities = stateFactory.getCities($scope.state.ID).then(function (response) {
                    $scope.cities = response.data.Data;
                    $scope.selectedCity = $scope.cities[0];
                    $scope.stationCode = $scope.state.Name.substr(0, 3) + "-" + $scope.selectedCity.city.substr(0, 3);
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    $scope.onDateChanged = function (date) {
        $scope.date = date;
    }

    $scope.isValid = function () {
        if ($scope.actualSpeed != null && $scope.actualSpeed != undefined) {
            $scope.buttonDisabled = false;
            $scope.variance = $scope.state.predictedSpeed - $scope.actualSpeed;

            if ($scope.variance == -3 || $scope.variance == 3)
                $scope.varianceColor = 'purple';
            else if ($scope.variance <= -5 || $scope.variance >= 5)
                $scope.varianceColor = 'red';
            else
                $scope.varianceColor = 'black';
        }
        else {
            $scope.variance = "";
            $scope.buttonDisabled = true;
        }
    };
    $scope.getCities = function () {
        if ($scope.state)
            var id = $scope.state.ID;
        else
            id = 1;
        stateFactory.getCities(id).then(function (response) {
            $scope.cities = response.data.Data;
            $scope.selectedCity = $scope.cities[0];
            $scope.stationCode = $scope.state.Name.substr(0, 3) + "-" + $scope.selectedCity.city.substr(0, 3);
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }
    $scope.date = new Date();

    $scope.save = function () {
        var ref = new Firebase("https://windreporting.firebaseio.com");
        var firebaseRef = ref.child("reports")
        var name = $scope.state.Name;
        var city = $scope.selectedCity.city;
        var date = $scope.date.toDateString();
        var predictedSpeed = $scope.state.predictedSpeed;
        var stationCode = $scope.stationCode;
        var variance = $scope.variance;
        var actualSpeed = $scope.actualSpeed;
        firebaseRef.push().set({
            name: name,
            city: city,
            date: date,
            predictedSpeed: predictedSpeed,
            stationCode: stationCode,
            variance: variance,
            actualSpeed: actualSpeed
        });
        Notification.success({ message: 'Report added Successfully', delay: 5000 });
        $scope.cancel();
    }
    $scope.cancel = function () {
        $scope.actualSpeed = '';
        $scope.variance = '';
        $scope.buttonDisabled = true;
    }

}])
