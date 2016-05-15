app.factory('stateFactory', ['$http', function($http) {

    var urlBase = 'https://www.whizapi.com/api/v2/util/ui/in/';
    var appKey = 'project-app-key=csk5bec6jnfdwzjxhee8eslb';
    var stateFactory = {};
    var stateUrl = 'indian-states-list?';
    var cityUrl = 'indian-city-by-state?';

    stateFactory.getStates = function () {
        return $http.get('services/states.json');
    };

    stateFactory.getCities = function (id) {
        return $http.get(urlBase +cityUrl+'stateid='+id+ '&' +appKey);
    };

    return stateFactory;
}
]);