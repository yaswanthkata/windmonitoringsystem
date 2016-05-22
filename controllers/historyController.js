app.controller('historyController', ['$scope', 'stateFactory', function ($scope, stateFactory) {
    $scope.reports = [];
    // this waits for the data to load and then logs the output. Therefore,
    // data from the server will now appear in the logged output. Use this with care!

    function getReports() {
        stateFactory.getReports().then(function (response) {
            var endDate = new Date();
            var startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 10);
            $scope.reports = response.data;
            $scope.startDate = startDate;
            $scope.endDate = endDate;
            $scope.pagedReports = [];
            $scope.itemsPerPage = 10;
            $scope.currentPage = 1;
            var filteredReports = [];
            var resultProductData = $scope.reports.filter(function (a) {
                var date = new Date(a.date);
                if (date >= startDate && date <= endDate)
                    filteredReports.push(a);
            });
            $scope.historyReports = filteredReports;

            $scope.figureOutReportsToDisplay();
            console.log(resultProductData);
        })
          .catch(function (err) {
              console.error(err);
          });
    }
    getReports();
    $scope.pageChanged = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.pagedReports = $scope.historyReports.slice(begin, end);
    };

    $scope.figureOutReportsToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.pagedReports = $scope.historyReports.slice(begin, end);
    };


}]);