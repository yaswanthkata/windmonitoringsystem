app.controller('HomeController', ['$scope', 'stateFactory', 'Notification',
function ($scope, stateFactory, Notification) {

    var windReport = {};
    var reports = [];
    $scope.stationCode;
    $scope.buttonDisabled = true;
    getStates();
    function getStates() {
        stateFactory.getStates()
            .then(function (response) {
                $scope.states = response.data;
                for (var i = 0; i < $scope.states.length - 1; i++) {
                    $scope.states[i].predictedSpeed = Math.floor((Math.random() * 10) + 10);
                }
                $scope.state = $scope.states[0];
                $scope.cities = stateFactory.getCities($scope.state.ID).then(function (response) {
                    $scope.cities = response.data;
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

    function getStationCode(state, city) {

        return state.Name.substr(0, 3) + "-" + city.city.substr(0, 3);
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
            $scope.cities = response.data;
            $scope.selectedCity = $scope.cities[0];
            $scope.stationCode = $scope.state.Name.substr(0, 3) + "-" + $scope.selectedCity.city.substr(0, 3);
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }
    $scope.date = new Date();
    $scope.cityChanged = function (city) {
        $scope.selectedCity = city;
        $scope.stationCode = getStationCode($scope.state, $scope.selectedCity);
    }

    $scope.save = function () {
        var windReport = {};
        windReport.name = $scope.state.Name;
        windReport.city = $scope.selectedCity.city;
        windReport.date = $scope.date.toDateString();
        windReport.predictedSpeed = $scope.state.predictedSpeed;
        windReport.stationCode = $scope.stationCode;
        windReport.variance = $scope.variance;
        windReport.actualSpeed = $scope.actualSpeed;
        stateFactory.postReport(windReport).then(
        function (response) {
            if (response.status == 200)
                Notification.success({ message: 'Report added Successfully', delay: 5000 });
        }
            );
        $scope.cancel();
    }
    $scope.cancel = function () {
        $scope.actualSpeed = '';
        $scope.variance = '';
        $scope.buttonDisabled = true;
    }

}])
