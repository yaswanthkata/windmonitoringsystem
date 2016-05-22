app.factory('stateFactory', ['$http', function ($http) {

    var urlBase = 'http://localhost:55713/api/';
    var stateFactory = {};
    var stateUrl = 'allstates';
    var cityUrl = 'indian-city-by-state?';

    stateFactory.getStates = function () {
        return $http.get(urlBase + stateUrl);
    };

    stateFactory.getCities = function (id) {
        return $http.get(urlBase + 'state/' + id + '/cities');
    };

    stateFactory.getReports = function () {
        return $http.get(urlBase + 'reports');
    };

    stateFactory.postReport = function (windReport) {
        var request = $http({
            method: "POST",
            url: urlBase + 'reports',
            data: windReport,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return request;
    }
    return stateFactory;
}
]);